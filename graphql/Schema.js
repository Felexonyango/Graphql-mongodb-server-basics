const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull
} = require('graphql')
const User = require('../model/user')

//customer type 
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: {
        id: {
            type: GraphQLNonNull(GraphQLInt)
        },
        name: {
            type: GraphQLNonNull(GraphQLString)
        },
        email: {
            type: GraphQLNonNull(GraphQLString)
        },
        age: {
            type: GraphQLNonNull(GraphQLInt)
        }
    }

})

//RootQuery
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            // to fetch customer  by id 
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parentValue, args) {
                return User.findById(args.id)

            }
        },
        // to fetch all customers from the endpoint =dummy data
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {

                return User.findById(parentValue.id)
            }

        }
    }

})
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addUser: {
            type: CustomerType,
            args: {
                id: { type: GraphQLNonNull(GraphQLInt) },
                email: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                age: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve(parentValue, args) {
                let user = new User({
                    id: args.id,
                    name: args.args,
                    email: args.args,
                    age: args.age
                })
                return user.save()
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation

})