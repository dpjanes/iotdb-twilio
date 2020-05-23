/*
 *  messages/phone.list.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-05-23
 *
 *  Copyright (2013-2020) David P. Janes
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")

/**
 *  This can be made more sophisticated in the future
 *
 *
client.incomingPhoneNumbers
      .create({phoneNumber: '+15017122661'})
      .then(incoming_phone_number => console.log(incoming_phone_number.sid));
 */
const phone = {}
phone.list = _.promise((self, done) => {
    _.promise.validate(self, phone.list)

    const query = {
        limit: self.query_limit || 100,
    }

    if (self.query) {
        if (self.query.phone_number) {
            query.phoneNumber = self.query.phone_number
        }
    }

    self.twilio.incomingPhoneNumbers
        .list(query)
        .then(phones => {
            self.phones = phones
            self.cursor = null // XXX

            done(null, self)
        })
        .catch(done)
})

phone.list.method = "phone.list"
phone.list.description = ``
phone.list.requires = {
    twilio: _.is.Object,
}
phone.list.accepts = {
    query: {
        phone_number: _.is.String,
    },
    query_limit: _.is.Integer,
}
phone.list.produces = {
    phones: _.is.Array.of.Dictionary,
    cursor: _.is.Dictionary,
}

/**
 *  API
 */
exports.phone = phone
