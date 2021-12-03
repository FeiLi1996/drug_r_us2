
def serializerProduct(object):
	return{
		'id':object.id,
		'drug_name':object.name,
		'price': object.price,
		'quantity': object.quantity,
		'email':object.user_email
	}

			
			