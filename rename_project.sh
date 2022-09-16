#!/bin/bash -e

self_name='rename_project.sh'

main() {
  read -p 'Enter the context name (kebab-case): ' context_name
  read -p 'Enter the service name (hit enter for the default: web): ' service_name
  read -p 'Enter the solution name (PascalCase): ' solution_name
  read -p 'Enter the human-readable app name (My App): ' app_name

  replace_in_all_files 'project-template' "$context_name"
  replace_in_all_files 'ProjectTemplate' "$solution_name"
  replace_in_all_files 'template-web' "${service_name:-web}"
  replace_in_all_files 'Project_Template' "$app_name"

  replace_in_all_file_names 'ProjectTemplate' "$solution_name"

  rm "$self_name"

  git add --all && git commit -m 'Rename project files'
}

replace_in_all_files() {
  local replace_from="$1"
  : "${replace_from:?}"
  local replace_to="$2"
  : "${replace_to:?}"

  for file in $(git ls-files); do
    if [[ "$file" != "$self_name" ]]; then
      sed -i -e "s/$replace_from/$replace_to/g" "$file"
    fi
  done
}

replace_in_all_file_names() {
  local replace_from="$1"
  : "${replace_from:?}"
  local replace_to="$2"
  : "${replace_to:?}"

  for file in $(git ls-files | grep "$replace_from"); do
    local new_name="${file//"$replace_from"/"$replace_to"}"
    mkdir -p "$(dirname "$new_name")"
    mv "$file" "$new_name"
  done

  find . -type d -empty -delete
}

main

