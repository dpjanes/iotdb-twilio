/*
 *  messages/publish_sms.js
 *
 *  David Janes
 *  IOTDB.org
 *  2020-05-05
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
const publish_sms = _.promise((self, done) => {
    _.promise.validate(self, publish_sms)

    self.twilio.messages
        .create({
            body: self.document,
            to: self.to_phone,
            from: self.from_phone,
        })
        .then(result => {
            self.twilio$result = result
            done(null, self)
        })
        .catch(error => {
            error.self = self
            done(error, null)
        })
})

publish_sms.method = "messages.publish_sms"
publish_sms.description = ``
publish_sms.requires = {
    twilio: _.is.Object,
    document: _.is.String,
    to_phone: _.is.String,
}
publish_sms.accepts = {
    from_phone: _.is.String,
}
publish_sms.produces = {
    twilio$result: _.is.Object,
}

/**
 *  API
 */
exports.publish_sms = publish_sms
