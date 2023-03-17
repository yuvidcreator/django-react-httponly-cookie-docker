ARG NODE_VERSION=lts-alpine3.16

FROM node:${NODE_VERSION} as node

FROM node as client-local-build

ARG APP_HOME=/app

RUN apk add --no-cache libc6-compat

WORKDIR ${APP_HOME}

COPY ./package.json ./yarn.lock* ./package-lock.json* ./pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

# COPY ./package*.json  . 

# COPY ./yarn.lock .

RUN yarn install --frozen-lockfile

COPY . ${APP_HOME}

CMD ["yarn", "start"]

