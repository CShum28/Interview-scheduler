#!/bin/bash

# Check for user input
if [ -z "$1" ] || [ -z "$2" ]; then
        echo "Expects: getdisplayip.sh \"VPN Interface\" \"Default Interface\""
        exit 0
fi

VPNIFACE=$1
DEFIFACE=$2

VPNCMD="/mnt/c/Windows/system32/netsh.exe interface show interface \"${VPNIFACE}\""
VPNRES=$(eval "$VPNCMD")

DEFCMD="/mnt/c/Windows/system32/netsh.exe interface show interface \"${DEFIFACE}\""
DEFRES=$(eval "$DEFCMD")

if [[ "$DEFRES" == *"Disconnected"* ]] && [[ "$VPNRES" == *"Disconnected"* ]]; then
        echo "Both interfaces are disconnected."
        exit 0
fi

IPCMD=""

if [[ "$VPNRES" == *"Disconnected"* ]]; then
        IPCMD="/mnt/c/Windows/system32/netsh.exe interface ip show addresses \"${DEFIFACE}\""
else
        IPCMD="/mnt/c/Windows/system32/netsh.exe interface ip show address \"${VPNIFACE}\""
fi

IPCMD="${IPCMD} | grep \"IP Address\" | perl -lpe 's/\s+IP Address:\s+(\d+.+?)[\r\n]*\$/\$1:0.0/'"

echo $(eval "$IPCMD")
