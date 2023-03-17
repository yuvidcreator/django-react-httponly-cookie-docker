ifneq (,$(wildcard ./.env))
include .env
export
ENV_FILE_PARAM = --env-file .env

endif

# For Docker Dev CI-CD Commands
build:
	docker-compose up --build

up:
	docker-compose up

restart:
	docker-compose up -d

down:
	docker-compose down

show-logs:
	docker-compose logs

migrate:
	docker-compose exec ecom_dev_api python3 manage.py migrate

makemigrations:
	docker-compose exec ecom_dev_api python3 manage.py makemigrations

superuser:
	docker-compose exec ecom_dev_api python3 manage.py createsuperuser

collectstatic:
	docker-compose exec ecom_dev_api python3 manage.py collectstatic --noinput --clear

down-v:
	docker-compose down -v

dbvolume:
	docker volume inspect djreact-ecom_ecom_dev_postgres-db

ecom-dev-db:
	docker-compose exec postgres-db psql --username=gspgadmin --dbname=gsdevdb

restart-nginx-dev:
	docker-compose exec nginx nginx -s reload


# For Docker Production Commands
show-logs-prod:
	docker compose -f docker-compose.prod.yml logs

migrate-prod:
	docker compose -f docker-compose.prod.yml exec ecom_prod_api python3 manage.py migrate

makemigrations-prod:
	docker compose -f docker-compose.prod.yml exec ecom_prod_api python3 manage.py makemigrations

superuser-prod:
	docker compose -f docker-compose.prod.yml exec ecom_prod_api python3 manage.py createsuperuser

collectstatic-prod:
	docker compose -f docker-compose.prod.yml exec ecom_prod_api python3 manage.py collectstatic --noinput --clear

down-prod-v:
	docker compose -f docker-compose.prod.yml down -v

dbvolume-prod:
	docker volume inspect ecom_prod_postgres-db

ecom-prod-db:
	docker compose -f docker-compose.prod.yml exec ecom_prod_postgres-db psql --username=gspgadmin --dbname=gsproddb

restart-nginx-prod:
	docker-compose -f docker-compose.prod.yml exec ecom_prod_nginx nginx -s reload



# Django APP Testing commands - in progress
test:
	docker-compose exec api pytest -p no:warnings --cov=.

test-html:
	docker-compose exec api pytest -p no:warnings --cov=. --cov-report html

flake8:
	docker-compose exec api flake8 .

black-check:
	docker-compose exec api black --check --exclude=migrations .

black-diff:
	docker-compose exec api black --diff --exclude=migrations .

black:
	docker-compose exec api black --exclude=migrations .

isort-check:
	docker-compose exec api isort . --check-only --skip env --skip migrations

isort-diff:
	docker-compose exec api isort . --diff --skip env --skip migrations

isort:
	docker-compose exec api isort . --skip env --skip migrations