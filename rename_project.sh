#!/bin/bash -e

main() {
  read -p 'Enter the context name (kebab-case): ' context_name
  read -p 'Enter the solution name (PascalCase): ' solution_name
  read -p 'Enter the human-readable app name (My App): ' app_name

  replace_in_all_files "project-template" "$context_name"
  replace_in_all_files "ProjectTemplate" "$solution_name"
  replace_in_all_files "Project_Template" "$app_name"

  replace_in_all_file_names "ProjectTemplate" "$solution_name"

  rm rename_project.sh

  git add --all && git commit -m 'Rename project files'
}

replace_in_all_files() {
  not_implemented
}

replace_in_all_file_names() {
  not_implemented
}

main
