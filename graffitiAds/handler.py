import boto3
import json
import os
import random
import string
from boto3.dynamodb.conditions import Key, Attr
from datetime import datetime, timezone

# Instantiate messages table
graffiti_table = boto3.resource('dynamodb').Table('graffitis')

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))

def get_messages_graffiti(event, context):
    id_graffiti = event.get('pathParameters', {}).get('id_graffiti')
    messages = graffiti_table.scan(FilterExpression=Attr("des_graffiti").not_exists() & Attr("id").eq(id_graffiti))
    if "Items" in messages:
        body = {
            "status": 200,
            'messages': [ {'id': x['id'],'fecha_publicacion': x['fecha_publicacion'], 'usuario': x['usuario'], 'text': x['text']} for x in messages["Items"] ],
        }
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    else:
        # No Item == 404
        body = {
            "status": 404,
            "title": "Chat graffiti not found",
            "detail": f"Chat from {id_graffiti} not found in database",
        }
        response = {
            "statusCode": 404,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    # return
    return response


def send_message_graffiti(event, context):
    id_graffiti = event.get('pathParameters',{}).get('id_graffiti')
    message = json.loads(event.get('body', '{}'))
    graffiti_table.put_item(
        Item={
            'id_graffiti': get_random_string(10),
            'id': id_graffiti,
            'fecha_publicacion': datetime.utcnow().replace(tzinfo=timezone.utc).isoformat(),
            'usuario': message['usuario'],
            'text': message['text'],
        }
    )
    body = {
        "status": 201,
        "title": "OK",
        "detail": f"New message posted into {id_graffiti} chat",
    }
    return {
        "statusCode": 201,
        "headers": {
                'Access-Control-Allow-Origin': '*'
            },
        "body": json.dumps(body)
    }

def get_graffiti(event, context):
    id_graffiti = event.get('pathParameters', {}).get('id_graffiti')
    messages = graffiti_table.scan(FilterExpression=Attr("des_graffiti").exists() & Attr("id").eq(id_graffiti))
    if "Items" in messages:
        body = {
            "status": 200,
            'messages': [ {'id_graffiti': x['id_graffiti'],'id': x['id'],'fecha_publicacion': x['fecha_publicacion'],'usuario': x['usuario'], 'des_graffiti': x['des_graffiti']} for x in messages["Items"] ],
        }
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    else:
        # No Item == 404
        body = {
            "status": 404,
            "title": "Graffiti not found",
            "detail": f"Graffiti {id_graffiti} not found in database",
        }
        response = {
            "statusCode": 404,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    # return
    return response


def send_graffiti(event, context):
    id_graffiti = event.get('pathParameters',{}).get('id_graffiti')
    graffiti = json.loads(event.get('body', '{}'))
    graffiti_table.put_item(
        Item={
            'id_graffiti': get_random_string(10),
            'id': id_graffiti,
            'fecha_publicacion': datetime.utcnow().replace(tzinfo=timezone.utc).isoformat(),
            'usuario': graffiti['usuario'],
            'des_graffiti': graffiti['des_graffiti'],
        }
    )
    body = {
        "status": 201,
        "title": "OK",
        "detail": f"New graffiti posted {id_graffiti}",
    }
    return {
        "statusCode": 201,
        "headers": {
                'Access-Control-Allow-Origin': '*'
            },
        "body": json.dumps(body)
    }

def get_all_graffitis(event, context):
    messages = graffiti_table.scan(FilterExpression=Attr("des_graffiti").exists())
    if "Items" in messages:
        body = {
            "status": 200,
            'messages': [ {'id_graffiti': x['id_graffiti'],'id': x['id'],'fecha_publicacion': x['fecha_publicacion'],'usuario': x['usuario'], 'des_graffiti': x['des_graffiti']} for x in messages["Items"] ],
        }
        response = {
            "statusCode": 200,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    else:
        # No Item == 404
        body = {
            "status": 404,
            "title": "Graffiti not found"
        }
        response = {
            "statusCode": 404,
            "headers": {
                'Access-Control-Allow-Origin': '*'
            },
            "body": json.dumps(body)
        }
    # return
    return response
