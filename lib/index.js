/*
 *  lib/index.js
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

module.exports = Object.assign(
    {},
    require("./initialize"),
    require("./publish_sms"),
    {}
)

/**
 */
const _bind = _method => {
    const f = _.promise((self, done) => {
        _.promise.validate(self, f)

        const _raw = eval(`self.twilio.${_method}`)
        const _parent = eval(`self.twilio.${_method.replace(/[.][^.]*$/, "")}`)
        const _call = _raw.bind(_parent)

        _call(self.twilio$in)
            .then(result => {
                self.twilio$result = result
                done(null, self)
            })
            .catch(error => {
                error.self = self
                done(error, null)
            })
    })

    f.method = _method
    f.description = ``
    f.requires = {
        twilio: _.is.Object,
        twilio$in: _.is.Dictionary,
    }
    f.produces = {
        twilio$result: _.is.Object,
    }
    f.params = {
        twilio$in: _.p.normal,
    }
    f.p = _.p(f)

    return f
}

module.exports.messages = {
    create: _bind("messages.create"),
}
