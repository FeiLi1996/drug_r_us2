
from flask import Flask, request , jsonify ,session
from flask_session import Session
from flask_bcrypt import Bcrypt
from flask_cors import CORS, cross_origin
from config import ApplicationConfig
from models import db, User ,StoreProducts,UserProfile
from drug_list import make_drug_list
from serialize import serializerProduct

app = Flask(__name__)

app.config.from_object(ApplicationConfig)

bcrypt=Bcrypt(app)
CORS(app, supports_credentials=True)
server_session = Session(app)
db.init_app(app)
with app.app_context():
    #db.drop_all()
    #StoreProducts.__table__.drop(db.engine)
    db.create_all()
   



@app.route('/')
def index():
    return 'testing'



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
    print('helllo coookie above','login cookie')
    
    return jsonify({




            "message":"you are authorized"
            
    })


@app.route('/me',methods=["GET"])
def get_current_user():
    user_id = session.get("user_id")
    print(user_id,'@me route cookie')
    if not user_id:
        return jsonify({"error":"Unathorized"}), 401
    user =User.query.filter_by(id=user_id).first()
    return jsonify({
        'message':'User is authorized',
         "id": user.id,
        "email": user.email

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

    new_product =StoreProducts(name=name,price =price,quantity=quantity,user_email=user_email )
    db.session.add(new_product)
    db.session.commit()

    return jsonify({

            "id":new_product.id,
            "name":new_product.name,
            "price":new_product.price,
            "quantity":new_product.quantity,
            "user_email" :new_product.user_email
       
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

            [*map(serializerProduct,products)]
           
    )
    



@app.route('/delete_product',methods=["POST"])
def delete_product():
   

    id=request.json["id"]
    StoreProducts.query.filter_by(id=id).delete()
    db.session.commit()
        

    return jsonify({

            "msg": "deleted"
           
           
        }
    )
@app.route('/update_product_post_checkout',methods=["POST"])
def update_product_post_checkout():
   

    cartProductDrugInfo=request.json["cartProductDrugInfo"]
 
    for eachProduct in cartProductDrugInfo:
        
        product =StoreProducts.query.filter_by(id=eachProduct['drug_id']).first()
        new_quantity = product.quantity - eachProduct["quantity"]
        if(new_quantity):
            StoreProducts.query.filter_by(id=eachProduct['drug_id']).update({'quantity':new_quantity})
        else:
            StoreProducts.query.filter_by(id=eachProduct['drug_id']).delete()
    db.session.commit()
        

    return jsonify({

            "msg": cartProductDrugInfo
           
           
        }
    )




@app.route('/edit_user_profile',methods=["POST"])
def edit_user_profile():

    userProfile = request.json['userProfile']
    user_profile_exists = UserProfile.query.filter_by(user_email=userProfile["user_email"]).first() 
    print(user_profile_exists,'exist?')
    delimiter =','
    stringDrugProfile = delimiter.join(userProfile["drug_profile"])
    if user_profile_exists:
            
            user_profile_exists.profile_name=userProfile["profile_name"]
            user_profile_exists.address=userProfile["address"]
            user_profile_exists.payment_card= userProfile["payment_card"]
            user_profile_exists.drug_profile=stringDrugProfile
          
            db.session.commit()
            return{
                "msg":"new user updated"
            }

    else: 
    
            new_user =UserProfile(profile_name=userProfile["profile_name"],
            date_of_birth =userProfile["date_of_birth"],
            address=userProfile["address"],
            payment_card= userProfile["payment_card"],
            drug_profile=stringDrugProfile,
            user_email=userProfile["user_email"] )
            db.session.add(new_user)
            db.session.commit()
            return{
                "msg":"new user created",
                "profile_name":new_user.profile_name,
                "date_of_birth":new_user.date_of_birth,
                "address":new_user.address,
                "payment_card":new_user.payment_card,
                "drug_profile":new_user.drug_profile,
                "user_email":new_user.user_email   
                }
   
  

@app.route('/get_user_profile',methods=["POST"])
def get_user_profile():
    email = request.json["user_email"]
    
    user_profile = UserProfile.query.filter_by(user_email=email).first()
    
    if(user_profile):

        drug_list = user_profile.drug_profile.split(',')
       
        if drug_list[0] =='':
            drug_list.pop(0)
        return jsonify({

                    "profile_name":user_profile.profile_name,
                    "date_of_birth":user_profile.date_of_birth,
                    "address":user_profile.address,
                    "payment_card":user_profile.payment_card,
                    "drug_profile":drug_list
            
            
            }
        )
    else:
        return jsonify({"error":"No User"}), 404





if __name__=='__main__':
    app.run(debug=False)