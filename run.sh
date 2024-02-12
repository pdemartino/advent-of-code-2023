#!/usr/bin/env bash
SCRIPT_PATH=$(realpath $(dirname "$0"))

function missing_main_error_and_exit {
    echo "Main file '${1}' not found"
    exit 1
}


if [ $# -lt 1 ]; then
    echo "Usage: run.sh <language>/<day>[/<variation>] [-d|--debug] [-i=<input_file>|--input=<input_file>]"
    exit 1
fi

code_dir="$1"
# Extract Day of Advent and language from first parameter, by spltting path by /
IFS='/' read -r -a array <<< "${1}"
language=${array[0]}
day=${array[1]}

# Define defaults for optional parameters
debug=false
input_file="$SCRIPT_PATH/problems/${day}/input"

# Extract all the optional parameters starting from the 3rd one (index 2)
for i in "${@:2}"
do
    case $i in
        -d|--debug)
        debug=true
        ;;
        -i=*|--input=*)
        input_file="${i#*=}"
        ;;
        *)
                # unknown option
        ;;
    esac
done

# Run the code according to the language
case $language in
    "bash")
        main="${code_dir}/main.sh"
        bash "$main"
        ;;
    "java")
        echo "Java TODO"
        break
        javac $code_dir
        java $day
        ;;
    "js")
        engine="node"
        main="${code_dir}/index.js"
        engine_params=""
        [ $debug == true ] && engine_params="$engine_params --inspect-brk"
        ;;
    "kt")
        echo "Kotlin TODO"
        break
        kotlinc $code_dir -include-runtime -d $day.jar
        java -jar $day.jar
        ;;
    *)
        echo "Language not supported"
        ;;
esac


command="$engine $engine_params $main $input_file"
[ ! -f "$main" ] && missing_main_error_and_exit "$main"
echo "Run: $command"
$command

