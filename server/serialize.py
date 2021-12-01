		# @app.route('/api' methods=['GET'])
		# def index():
		# 	//return{
		# 		'name':'hello'
		# 	//}
		
		# 	todo=Todo.query.all()
		# 	return{
		# 		jsonify([*map( todo_serializer,todo)]) # star is for unpacking into an list
		# 	}
		
		
		
		
	
def serializerProduct(object):
	return{
		'id':object.id,
		'drug_name':object.name,
		'price': object.price,
		'quantity': object.quantity,
		'image':object.image,
		'email':object.user_email
	}

# def serializerUserProfile(object):
# 	return{
#    		"profile_name":object.profile_name,
#         "date_of_birth":object.date_of_birt,
#         "address":object.address,
#         "payment_card":object.payment_card,
#         "drug_profile":object.drug_profile,
#         "user_email":object.user_email
# 	}
					
			