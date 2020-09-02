const graphql = require('graphql')
const _ = require('lodash')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema
} = graphql

const users = [
    { id: '1', firstName: 'John', age: 25, companyId: '11'},
    { id: '2', firstName: 'Merry', age: 27, companyId: '12'},
    { id: '3', firstName: 'Jack', age: 21, companyId: '12'}
]

const companies = [
    {id: '11', name: 'Apple', desc: 'Think out of the box'},
    {id: '12', name: 'google', desc: 'beleiveing in privacy'}
]

const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: {
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        desc: { type: GraphQLString }
    }
})

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type : GraphQLString },
        firstName: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: { 
            type: CompanyType,
            resolve(parentValue,args) {
                return _.find(companies, { id: parentValue.companyId })
            }
        }
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id : { type: GraphQLString } },
            resolve(parentValue,args) {
                return _.find(users, { id: args.id } )
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})