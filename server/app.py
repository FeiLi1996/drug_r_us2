
from flask import Flask, request , jsonify ,session
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from config import ApplicationConfig
from models import db, User ,StoreProducts,UserProfile
from drug_list import make_drug_list
from serialize import serializer

app = Flask(__name__)

app.config.from_object(ApplicationConfig)

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
with app.app_context():
    #db.drop_all()
    db.create_all()



@app.route('/')
def index():
    return 'testing'

#below 2 wwould be done in front end axio calls
#@app.route('/get_rxcui',methods =["GET"])
#@app.route('/get_interactions',methods =["GET"])

@app.route('/get_drug_list',methods=["GET"])
def get_drug_list():
    drug_list = make_drug_list()
    
    return jsonify({

            "drug_list":drug_list
            
        }


    )
@app.route('/register',methods=["POST"])
def register_user():
    
    
    email = request.json["email"]
    password = request.json["password"]

   
    
    user_exists = User.query.filter_by(email=email).first() 
    if user_exists:
        return jsonify({"error":"This user already exists"}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user =User(email=email,password =hashed_password )
    db.session.add(new_user)
    db.session.commit()
    session["user_id"] =new_user.id

    

    return jsonify({

            "id":new_user.id,
            "email":new_user.email
        }
    )

@app.route('/login' ,methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    
    user = User.query.filter_by(email=email).first() 
    if user is None:
        return jsonify({"error":"Unathorized"}), 401


    if not bcrypt.check_password_hash(user.password,password):
        return jsonify({"error":"Unathorized"}), 401
    
    
    session["user_id"] =user.id
    print(session.get('user_id'),'login cookie')
    
    return jsonify({




            "message":"you are authorized"
            
    })


@app.route('/@me',methods=["GET"])
def get_current_user():
    user_id = session.get('user_id')
    print(user_id,'@me route cookie')
    if not user_id:
        return jsonify({"error":"Unathorized"}), 401
    user =User.query.filter_by(id='user_id').first()
    return jsonify({
        'message':'User is authorized'
    })


@app.route('/logout',methods=['GET'])
def logout_user():
    session.pop('user_id')
    return "200"




@app.route('/send_products',methods=["POST"])
def send_products():

    # class StoreProducts(db.Model):
    # __tablename__="store_products"
    # id = db.Column(db.Integer,primary_key=True)
    # name = db.Column(db.String(345),nullable=False)
    # price = db.Column(db.Integer,nullable = False)
    # quantity = db.Column(db.Integer,nullable = False)
    # # image = db.Column(db.BLOB)
    # user_email=db.Column(db.String(345),db.ForeignKey('users.id'),nullable=False)
   
    name = request.json["name"]
    price = request.json["price"]
    quantity = request.json["quantity"]
    user_email = request.json["user_email"]
    # image = request.json["image"]
    # user_id = request.json["email"]

    #new_product =StoreProducts(name=name,price =price,quantity=quantity,image =image,user_id=user_id )
    new_product =StoreProducts(name=name,price =price,quantity=quantity,user_email=user_email )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({

            "id":new_product.id,
            "name":new_product.name,
            "price":new_product.price,
            "quantity":new_product.quantity,
            "user_email" :new_product.user_email
            # "id":new_product.image,
            # "id":new_product.user_email 
        }
    )


@app.route('/get_overall_products',methods=["GET"])
def get_overall_products():
   
    products = StoreProducts.query.all();
 
    # print(products)
    # print(type(products))
    # print(products[0])
    # print(type(products[0]))
    # print(type(products[0]) is StoreProducts)
    # print(products[0].name)

    # [<StoreProducts 1>, <StoreProducts 2>, <StoreProducts 3>, <StoreProducts 4>, <StoreProducts 5>]
    # <class 'list'>
    # <StoreProducts 1>
    # <class 'models.StoreProducts'>
    # True
    # aspirin

    #new_product =StoreProducts(name=name,price =price,quantity=quantity,image =image,user_id=user_id )
  
   
    return jsonify(

            [*map(serializer,products)]
           
    )
    


@app.route('/get_user_selling_products',methods=["GET"])
def get_user_selling_products():
   
    products = StoreProducts.query.all();
    # image = request.json["image"]
    # user_id = request.json["email"]

    #new_product =StoreProducts(name=name,price =price,quantity=quantity,image =image,user_id=user_id )

    #if return products then get issues with serilizable
    return jsonify({

            "id":products[0].name
           
           
        }
    )
@app.route('/delete_product',methods=["POST"])
def delete_product():
   

    id=request.json["id"]
    StoreProducts.query.filter_by(id=id).delete()
    db.session.commit()
        
    #products = StoreProducts.query.all();
    # image = request.json["image"]
    # user_id = request.json["email"]

    #new_product =StoreProducts(name=name,price =price,quantity=quantity,image =image,user_id=user_id )

    #if return products then get issues with serilizable
    return jsonify({

            "msg": "deleted"
           
           
        }
    )

@app.route('/get_user_profile',methods=["PUT"])
def get_user_profile():
   # email = request.json["email"]
    #user_profile = UserProfile.query.filter_by(user_email=email).first()
    # image = request.json["image"]
    # user_id = request.json["email"]

    #new_product =StoreProducts(name=name,price =price,quantity=quantity,image =image,user_id=user_id )

    #if return products then get issues with serilizable
    return jsonify({

           # "id":products[0].name
           
           
        }
    )





if __name__=='__main__':
    app.run(debug=False)