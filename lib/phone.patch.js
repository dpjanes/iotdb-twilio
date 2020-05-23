/*
 *  messages/phone.patch.js
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
const phone = {}
phone.patch = _.promise((self, done) => {
    _.promise.validate(self, phone.patch)

    const update = _.d.clone(self.phone)
    const sid = self.phone.sid
    delete self.phone.sid

    self.twilio.incomingPhoneNumbers(sid)
        .update(update)
        .then(phone => {
            self.phone = phone
            done(null, self)
        })
        .catch(done)
})

phone.patch.method = "phone.patch"
phone.patch.description = ``
phone.patch.requires = {
    twilio: _.is.Object,
    phone: {
        sid: _.is.String,
    },
}
phone.patch.accepts = {
}
phone.patch.produces = {
}

/**
 *  API
 */
exports.phone = phone
