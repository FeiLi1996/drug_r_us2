		# @app.route('/api' methods=['GET'])
		# def index():
		# 	//return{
		# 		'name':'hello'
		# 	//}
		
		# 	todo=Todo.query.all()
		# 	return{
		# 		jsonify([*map( todo_serializer,todo)]) # star is for unpacking into an list
		# 	}
		
		
		
		
	
def serializer(object):
	return{
		'id':object.id,
		'drug_name':object.name,
		'price': object.price,
		'quantity': object.quantity,
		'email':object.user_email
	}
					
			