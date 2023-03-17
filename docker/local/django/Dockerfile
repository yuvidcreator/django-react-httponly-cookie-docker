FROM python:3.10-slim-buster as devbuild

ENV APP_HOME=/app
RUN mkdir -p $APP_HOME
RUN mkdir -p $APP_HOME/staticfiles
RUN mkdir -p $APP_HOME/mediafiles
WORKDIR $APP_HOME


LABEL maintainer="webinoxmedia@gmail.com"
LABEL description="Django-React Ecom Full Stack App - Dev Boilerplate"


ENV PYTHONDONTWRITEBYTECODE 1

ENV PYTHONUNBUFFERED 1

RUN apt-get update \
    && apt-get install -y build-essential \
    && apt-get install -y libpq-dev \
    && apt-get install -y gettext \
    && apt-get -y install netcat gcc postgresql \
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get upgrade

# set user without root access
RUN useradd -r wmds
# RUN adduser -D wmds
# WORKDIR /home/wmds

COPY  ./requirements.txt ${APP_HOME}
# COPY --chown=wmds:wmds ./requirements.txt ${APP_HOME}

# RUN chown -R wmds:wmds ${APP_HOME}
# RUN chown -R wmds:wmds ${APP_HOME} .
# RUN chown -R wmds:wmds ${APP_HOME} *

RUN pip3 install --no-cache-dir --upgrade pip

RUN pip3 install --no-cache-dir -r requirements.txt


COPY ./docker/local/django/entrypoint /entrypoint
# RUN chown -R wmds:wmds /entrypoint
RUN sed -i 's/\r$//g' /entrypoint
RUN chmod +x /entrypoint

COPY ./docker/local/django/start /start
# RUN chown -R wmds:wmds /start
RUN sed -i 's/\r$//g' /start
RUN chmod +x /start

COPY ./docker/local/django/celery/worker/start /start-celeryworker
# RUN chown -R wmds:wmds /start-celeryworker
RUN sed -i 's/\r$//g' /start-celeryworker
RUN chmod +x /start-celeryworker

COPY ./docker/local/django/celery/flower/start /start-flower
# RUN chown -R wmds:wmds /start-flower
RUN sed -i 's/\r$//g' /start-flower
RUN chmod +x /start-flower

# USER wmds

# RUN python3 -m venv ${APP_HOME}/env
# ENV PATH="${APP_HOME}/env/bin:${PATH}"

# RUN chown -R wmds:wmds ${APP_HOME}/env
# RUN chmod +x ${APP_HOME}/env/*

# RUN pip3 install --no-cache-dir --upgrade pip

# RUN pip3 install --no-cache-dir -r requirements.txt


# COPY --chown=wmds:wmds . .


ENTRYPOINT ["/entrypoint"]