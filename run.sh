#!/usr/bin/env sh
code_dir=$1
# Split directory into three parts
IFS='/' read -r -a array <<< "$code_dir"

day=${array[0]}
language=${array[1]}
input_file="${day}/input"


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
        main="${code_dir}/index.js"
        node "$main" "$input_file"
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




