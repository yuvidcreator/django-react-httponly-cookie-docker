# stage1 - build react app first
FROM node:lts-alpine3.16 as builder

ARG APP_HOME=/app

RUN apk add --no-cache libc6-compat

WORKDIR ${APP_HOME}

COPY . ${APP_HOME}
# COPY ./prodenvexampl ./.env.local

COPY ./package.json ./yarn.lock* ./package-lock.json* ./pnpm-lock.yaml* ./
RUN \
    if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    elif [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
    else echo "Lockfile not found." && exit 1; \
    fi

RUN yarn install --frozen-lockfile

# COPY . ${APP_HOME}

RUN yarn build

RUN yarn global add serve

# RUN serve -s build