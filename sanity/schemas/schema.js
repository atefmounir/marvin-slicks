import createSchema from 'part:@sanity/base/schema-creator';                // First, we must import the schema creator
import schemaTypes from 'all:part:@sanity/base/schema-type';                // Then import schema types from any plugins that might expose them

import pizza from "./pizza";
import topping from "./topping";
import person from "./person";
import storeSettings from "./storeSettings";

export default createSchema({                                               // Then we give our schema to the builder and provide the result to Sanity
  name: 'default',                                                          // We name our schema
  types: schemaTypes.concat([                                               // Then proceed to concatenate our document type to the ones provided by any plugins that are installed
    pizza,topping,person,storeSettings
  ]),
});
