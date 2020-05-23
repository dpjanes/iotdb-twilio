/*
 *  messages/claim.js
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
 */
const claim = _.promise((self, done) => {
    _.promise.validate(self, claim)

    self.twilio.incomingPhoneNumbers
        .create({
            phoneNumber: self.phone_number,
        })
        .then(result => {
            console.log(result)
            done(null, self)
        })
        .catch(done)
})

claim.method = "claim"
claim.description = ``
claim.requires = {
    twilio: _.is.Object,
    phone_number: _.is.String,
}
claim.accepts = {
}
claim.produces = {
}

/**
 *  API
 */
exports.claim = claim
