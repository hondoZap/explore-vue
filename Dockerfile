ARG DOCKER_REGISTRY
FROM $DOCKER_REGISTRY/dotnet-sdk-6.0 as api-cache
COPY api /src/
RUN mkdir /proj && cd /src && \
  find . -type f -a \( -iname '*.sln' -o -iname '*.csproj' \) \
    -exec cp --parents "{}" /proj/ \;

FROM $DOCKER_REGISTRY/dotnet-sdk-6.0 as api
WORKDIR /src
COPY --from=api-cache /proj ./
RUN dotnet restore

COPY --from=api-cache /src ./
ARG VERSION
RUN dotnet build --no-restore \
 && dotnet publish --no-restore -c Release -o /publish ProjectTemplate

FROM $DOCKER_REGISTRY/node:16 as ui-cache
COPY ui /src/
RUN mkdir /proj && cd /src && \
  find . -type f -a \( -iname 'package.json' -o -iname 'package-lock.json' \) \
    -exec cp --parents "{}" /proj/ \;

FROM $DOCKER_REGISTRY/node:16 as ui
WORKDIR /src
COPY --from=ui-cache /proj ./
RUN npm ci

COPY --from=ui-cache /src ./
ARG VERSION
RUN VITE_APP_VERSION="$VERSION" npm run build

FROM $DOCKER_REGISTRY/dotnet-aspnet-6.0
COPY --from=api /publish /app
COPY --from=ui /src/dist /app/wwwroot
WORKDIR /app
ENTRYPOINT ["dotnet", "ProjectTemplate.dll"]
