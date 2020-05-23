/*
 *  messages/available_phone_numbers.js
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
 */
const available_phone_numbers = _.promise((self, done) => {
    _.promise.validate(self, available_phone_numbers)

    self.twilio.availablePhoneNumbers(self.query.country.toUpperCase())
        .local
        .list({
            capabilities: {
                "sms": true,
            },
            // areaCode: 510, 
            limit: 20
        })
        .then(locals => {
            self.phones = locals

            done(null, self)
        })
        .catch(done)
})

available_phone_numbers.method = "available_phone_numbers"
available_phone_numbers.description = ``
available_phone_numbers.requires = {
    twilio: _.is.Object,
    query: {
        country: _.is.String,
    },
}
available_phone_numbers.accepts = {
}
available_phone_numbers.produces = {
}

/**
 *  API
 */
exports.available_phone_numbers = available_phone_numbers
