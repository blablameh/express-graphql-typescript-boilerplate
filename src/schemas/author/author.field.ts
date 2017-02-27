import { GraphQLFieldDefinition } from 'graphql';

import { Context } from '../../context';
import { AbstractField, IGraphQLField } from '../abstract.field';
import { AuthorType } from '../author/author.type';
import { Book } from '../../builders/book.builder';

import { Logger } from '../../core/logger';
const log = Logger('app:schemas:author:AuthorField');


export class AuthorField extends AbstractField implements GraphQLFieldDefinition, IGraphQLField {

    public type = AuthorType;
    public name = 'author';
    public description = 'The author of this book';
    public args;

    public execute(source: Book, args, context: Context)
    public execute(source: any, args, context: Context) {
        log.debug('Resolve auhtor %s of the book ' + source.id, source.authorId);

        // Repo way
        // return context.repos.author.findAuthorById(source.authorId);

        // DataLoader
        return context.loaders.author.load(source.authorId);

        // Benchmark with 1000 Authors and per Author 10 Books
        // With Loaders => ca. 2s
        // Without Loaders => ca. 4s
    }

}
