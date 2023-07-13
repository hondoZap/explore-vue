#!/bin/bash -e

self_name='rename_project.sh'

while getopts 'dc:s:l:a:' opt; do
  case "$opt" in
    c)
      context_name="$OPTARG"
      ;;
    s)
      service_name="$OPTARG"
      ;;
    l)
      solution_name="$OPTARG"
      ;;
    a)
      app_name="$OPTARG"
      ;;
    d)
      dry_run=1
      ;;
  esac
done

main() {
  [ -z "$context_name" ] && read -p 'Enter the context name (including silo if present: context-name.silo): ' context_name
  [ -z "$service_name" ] && read -p 'Enter the service name (hit enter for the default: web): ' service_name
  [ -z "$solution_name" ] && read -p 'Enter the solution name (PascalCase): ' solution_name
  [ -z "$app_name" ] && read -p 'Enter the human-readable app name (My App): ' app_name

  replace_everything \
    'project-template' "$context_name" \
    'template-web' "${service_name:-web}" \
    'ProjectTemplate' "$solution_name" \
    'Project_Template' "$app_name"

  if [ -z "$dry_run" ]; then
    rm "$self_name"

    git add --all && git commit -m 'Rename project files'
  fi
}

replace_everything() {

  local replace_from="$1"
  : "${replace_from:?}"
  local replace_to="$2"
  : "${replace_to:?}"

  local max_depth="$(git ls-files | tr -cd '/\n' | sort | tail -n1 | wc -c)"

  local i=1
  for i in $(seq 1 2 $#); do
    local j=$((i+1))

    local replace_from="${!i}"
    local replace_to="${!j}"

    for depth in $(seq 1 $max_depth); do
      for file in $(find . -mindepth $depth -maxdepth $depth \
        -not \( \
          -path '*/.git/*' \
          -or -name '.envrc' \
          -or -path '*/node_modules/*' \
          -or -path '*/bin/*' \
          -or -path '*/obj/*' \
        \) ); do

        if [ -n "$dry_run" ]; then
          echo "$file: replace $replace_from -> $replace_to"
          continue
        fi

        if [[ -f "$file" && "$file" != "$self_name" ]]; then
          sed -i -e "s/$replace_from/$replace_to/g" "$file"
        fi

        local new_name="${file//"$replace_from"/"$replace_to"}"
        if [[ "$new_name" != "$file" ]]; then
          mkdir -p "$(dirname "$new_name")"
          mv "$file" "$new_name"
        fi
      done
    done
  done

  if [ -n "$dry_run" ]; then
    find . -type d -empty -delete
  fi
}

main

