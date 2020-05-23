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

if (action("phone.available")) {
    _.promise({
        twilio$cfg: cfg,
        query: {
            country: "CA",
        },
    })
        .then(twilio.initialize)
        .then(twilio.phone.available)
        .make(sd => {
            console.log("+", JSON.stringify(sd.phones, null, 2))
        })
        .catch(_.error.log)
} else if (action("phone.claim")) {
    if (!ad._.length) {
        console.log("argument required")
        process.exit(1)
    }

    _.promise({
        twilio$cfg: cfg,
        phone_number: ad._.shift()
    })
        .then(twilio.initialize)
        .then(twilio.phone.claim)
        .make(sd => {
            console.log("+", sd.phone)
        })
        .catch(_.error.log)
} else if (action("phone.list")) {
    _.promise({
        twilio$cfg: cfg,
    })
        .then(twilio.initialize)
        .then(twilio.phone.list)
        .make(sd => {
            console.log("+", sd.phones)
        })
        .catch(_.error.log)
} else if (action("phone.patch")) {
    if (!ad._.length) {
        console.log("argument required")
        process.exit(1)
    }

// +12268948315
// PN66e7b57843bc895052affb58fd39a0e9
    _.promise({
        twilio$cfg: cfg,
        query: {
            phone_number: ad._.shift()
        },

    })
        .then(twilio.initialize)
        .then(twilio.phone.list)
        .make(sd => {
            if (!sd.phones.length) {
                console.log("#", "phone not found")
                process.exit(1)
            }

            sd.phone = {
                sid: sd.phones[0].sid,
                friendlyName: `name ${_.timestamp.make()}`,
            }
        })
        .then(twilio.phone.patch)
        .make(sd => {
            console.log("+", sd.phone)
        })
        .catch(_.error.log)
} else if (!action_name) {
    console.log("#", "action required - should be one of:", actions.join(", "))
} else {
    console.log("#", "unknown action - should be one of:", actions.join(", "))
}

