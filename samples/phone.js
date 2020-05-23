/*
 *  samples/phone.js
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
const fs = require("iotdb-fs")
const twilio = require("..")

const minimist = require("minimist")
const path = require("path")

const cfg = require("../.cfg.json")

const ad = minimist(process.argv.slice(2), {
    string: [
        "_"
    ],
});
const action_name = ad._.shift()

const actions = []
const action = name => {
    actions.push(name)

    return action_name === name
}

if (action("available_phone_numbers")) {
    _.promise({
        twilio$cfg: cfg,
        query: {
            country: "CA",
        },
    })
        .then(twilio.initialize)
        .then(twilio.available_phone_numbers)
        .make(sd => {
            console.log("+", JSON.stringify(sd.phones, null, 2))
        })
        .catch(_.error.log)
} else if (action("phone.claim")) {
    if (!ad._.length) {
        console.log("argument required")
    }

    _.promise({
        twilio$cfg: cfg,
        phone_number: ad._.shift()
    })
        .then(twilio.initialize)
        .then(twilio.claim)
        .make(sd => {
        })
        .catch(_.error.log)
} else if (!action_name) {
    console.log("#", "action required - should be one of:", actions.join(", "))
} else {
    console.log("#", "unknown action - should be one of:", actions.join(", "))
}

