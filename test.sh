#!/usr/bin/env bash
SCRIPT_PATH=$(realpath $(dirname $0))

if [ $# -lt 1 ]; then
    echo "Usage: test.sh <language>/<day>[/<variation>]"
    exit 1
fi

code_dir="$1"
# Extract Day of Advent and language from first parameter, by spltting path by /
IFS='/' read -r -a array <<< "${1}"
day=${array[1]}
output_file="$SCRIPT_PATH/problems/$day/output"

actual=$( "$SCRIPT_PATH/run.sh" "$code_dir" )
expected=$(cat "$output_file")

if [ "$actual" == "$expected" ]; then
    echo "$code_dir ✅"
else
    echo "$code_dir ❌: expected=$expected actual=$actual"
fi