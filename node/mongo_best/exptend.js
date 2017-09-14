var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
	firstname : {
		type : String,
		trim : true
	},
	lastname : {
		type : String,
		trim : true		
	},
	sex : {
		type : String,
		set : function(sex){
			if(!sex) return ;
			if( sex === 'boy' || sex === 'nan' || sex === 'man'){
				return 'man'
			}else if( sex ==='girl' || sex === 'nv' || sex === 'women'){
				return 'women'
			}
		},
		get : function(sex){
			return '我是' + sex;
		}
	}
})

userSchema.set("toJSON",{getters:true,virtual:true})
userSchema.virtual('fullname').get(function(){
	return this.firstname + '  ' + this.lastname;
})
var User = mongoose.model('User',userSchema);

var user1 = new User({
	firstname : "Y             ",
	lastname : "      B",
	sex : "nan"
})

var user = mongoose.model('User')
var user2 = new user({
	firstname : '          B',
	lastname : '  Y   ',
	sex : 'girl'
})

console.log('user1 : ',user1);
console.log('user2:' , user2 );

console.log('user1.fullname :', user1.fullname);
console.log('user2.fullname :', user2.fullname)

console.log('user1toJson:',JSON.stringify(user1));
console.log('user2toJson:',JSON.stringify(user2));