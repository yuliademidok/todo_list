FROM python:3.9-slim-buster
ENV PYTHONUNBUFFERED=1
WORKDIR /todo_list

RUN apt-get update && apt-get -y install libpq-dev gcc && pip install psycopg2
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
