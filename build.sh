#!/bin/bash -e

: ${CI:=false}
: ${VERSION:=$(date +'%Y.%m.%d.0')-pre}
: ${WORKSPACE:=$(pwd)}
: ${RUN_TESTS:=true}
: ${PULL:=true}
: ${NO_CACHE:=false}

export CONTEXT_NAME=project-template
export SERVICE_NAME=template-web
export VERSION

trap 'rm -rf configuration; docker-compose down' EXIT

# set up build.properties for Labretto deploy
if $CI; then
  echo "\
VERSION = $VERSION
CONTEXT_NAME = $CONTEXT_NAME
SERVICE_NAME = $SERVICE_NAME" > "$WORKSPACE"/build.properties
fi

if $RUN_TESTS && $CI; then
  # get Labatt configuration and test
  mkdir configuration
  ~/labatt_configuration/get_configuration.sh "$SERVICE_NAME" "$CONTEXT_NAME"
fi & GET_CONFIG=$!

# build all images
if $CI; then
  export COMPOSE_FILE="docker-compose.yml:docker-compose.ci.yml"
fi
build_flags=()
if $PULL; then
  build_flags+=('--pull')
fi
if $NO_CACHE; then
  build_flags+=('--no-cache')
fi
docker-compose build "${build_flags[@]}"

# start to push release image to Labatt registry
if $CI; then
  docker-compose push
fi & PUSH_IMAGE=$!

if $RUN_TESTS; then
  wait "$GET_CONFIG"
  docker-compose run tests
else
  echo IGNORING TESTS FOR THIS RUN
fi

wait "$PUSH_IMAGE"
