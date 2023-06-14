#!/bin/bash

# There's probably a better ay to do this with a loop, I just don't really care enough to mess with it more.

port=443
trust_cert_file_location=`curl-config --ca`

hostname="raw.githubusercontent.com"
bash -c "echo -n | openssl s_client -showcerts -connect $hostname:$port -servername $hostname 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> $trust_cert_file_location"

hostname="git.io"
bash -c "echo -n | openssl s_client -showcerts -connect $hostname:$port -servername $hostname 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> $trust_cert_file_location"

hostname="gist.github.com"
bash -c "echo -n | openssl s_client -showcerts -connect $hostname:$port -servername $hostname 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> $trust_cert_file_location"

hostname="gist.githubusercontent.com"
bash -c "echo -n | openssl s_client -showcerts -connect $hostname:$port -servername $hostname 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> $trust_cert_file_location"

hostname="nodejs.org"
bash -c "echo -n | openssl s_client -showcerts -connect $hostname:$port -servername $hostname 2>/dev/null  | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' >> $trust_cert_file_location"
