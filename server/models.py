from enum import unique
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__="users"
    id = db.Column(db.String(32),primary_key=True, unique=True,default = get_uuid)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text,nullable = False)


class StoreProducts(db.Model):
    __tablename__="store_products"
    id = db.Column(db.Integer,primary_key=True)
    name = db.Column(db.String(345),nullable=False)
    price = db.Column(db.Integer,nullable = False)
    quantity = db.Column(db.Integer,nullable = False)
    # image = db.Column(db.BLOB)
    user_email=db.Column(db.String(345),db.ForeignKey('users.id'),nullable=False)

class UserProfile(db.Model):
    __tablename__="user_profile"
    id = db.Column(db.Integer,primary_key=True)
    profile_name = db.Column(db.String(345),nullable=False)
    date_of_birth = db.Column(db.String(10),nullable = False)
    address = db.Column(db.String,nullable = False)
    payment_card = db.Column(db.String,nullable = False)
    drug_profile = db.Column(db.String)
    user_email=db.Column(db.String(345),db.ForeignKey('users.id'),nullable=False)