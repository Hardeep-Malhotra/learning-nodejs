/***********************************************************************
 *                     NODE.JS EVENTS (COMPLETE NOTES)
 *
 * Author : Hardeep Singh
 * Purpose: Complete Node.js Events Notes
 * Level   : Beginner → Interview → Production
 *
 **********************************************************************/

/*
=========================================================================

1. Introduction to Events

2. Event Driven Programming

3. EventEmitter Class

4. Creating EventEmitter Object

5. on()

6. emit()

7. Passing Arguments

8. once()

9. off()

10. removeListener()

11. removeAllListeners()

12. listenerCount()

13. listeners()

14. eventNames()

15. setMaxListeners()

16. getMaxListeners()

17. error Event

18. Interview Questions

19. Production Notes

=========================================================================
*/

/*=========================================================================
                    TOPIC 1 : INTRODUCTION TO EVENTS
=========================================================================*/

/*
Definition:
-----------
An event is an action or occurrence that happens during the execution
of an application.

Simple Meaning:
---------------
An event is simply a notification that something has happened.

Examples:
---------
✔ User Login
✔ Order Placed
✔ Payment Success
✔ File Uploaded

Important Points:
-----------------
• Event is not a function.
• Event is just a signal.
• Listeners respond to events.
*/

/*=========================================================================
                TOPIC 2 : EVENT DRIVEN PROGRAMMING
=========================================================================*/

/*
Definition:
-----------
Event Driven Programming is a programming paradigm where the flow of
the application depends on events.

Flow:

Application
      ↓
Wait for Event
      ↓
Event Occurs
      ↓
Listener Executes

Advantages:
-----------
✔ Loose Coupling
✔ Better Scalability
✔ Easy Maintenance
✔ High Performance

Interview Point:
---------------
Event Driven ≠ Asynchronous
*/

/*=========================================================================
                TOPIC 2 : EVENT DRIVEN PROGRAMMING
=========================================================================*/

/*
Definition:
-----------
Event Driven Programming is a programming paradigm where the flow of
the application depends on events.

Flow:

Application
      ↓
Wait for Event
      ↓
Event Occurs
      ↓
Listener Executes

Advantages:
-----------
✔ Loose Coupling
✔ Better Scalability
✔ Easy Maintenance
✔ High Performance

Interview Point:
---------------
Event Driven ≠ Asynchronous
*/

/*=========================================================================
                  TOPIC 3 : EVENTEMITTER CLASS
=========================================================================*/

const { log } = require("console");
const EventEmitter = require("events");

/*
Definition:
-----------
EventEmitter is a built-in class provided by Node.js.

Purpose:
--------
It allows us to register listeners and emit events.

Interview Notes:
---------------
• EventEmitter is a Class.
• "events" is a Built-in Module.
• new EventEmitter() creates an object.
*/

/*=========================================================================
                    TOPIC 5 : on()
=========================================================================*/

/*
Purpose:
--------
Registers a listener for an event.

Syntax:
-------
emitter.on(eventName, callback)

Important:
----------
• Does NOT execute immediately.
• Only registers the listener.
*/

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User Logged In");
});

/*=========================================================================
                    TOPIC 6 : emit() Method
=========================================================================*/

/*
Definition
-----------
The emit() method is used to trigger (fire) a specific event.
When an event is emitted, Node.js immediately executes all the
listeners that are registered for that event.

Simple Meaning
--------------
emit() tells the EventEmitter:
"Hey! This event has happened. Execute all the listeners waiting for it."

Syntax
------
emitter.emit(eventName, [...arguments])

Parameters
----------
1. eventName (String | Symbol)
   - The name of the event that you want to trigger.

2. arguments (Optional)
   - Any additional data that should be passed to the listeners.

Return Value
------------
Returns true
→ If at least one listener exists for the event.

Returns false
→ If no listener is registered for that event.

Interview Point
---------------
✔ emit() triggers an event.
✔ emit() DOES NOT register listeners.
✔ emit() executes listeners immediately.
✔ emit() is synchronous by default.

=========================================================================
                        BASIC EXAMPLE
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("User Logged In");
});

emitter.emit("login");

/*
Output
------
User Logged In

Explanation
-----------
1. on() registers a listener.
2. emit() triggers the "login" event.
3. Node.js finds all listeners of "login".
4. Every registered listener is executed.
*/

/*=========================================================================
                EXAMPLE : Multiple Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", () => {
  console.log("Generate JWT");
});

emitter2.on("login", () => {
  console.log("Save Login History");
});

emitter2.on("login", () => {
  console.log("Send Notification");
});

emitter2.emit("login");

/*
Output
------

Generate JWT
Save Login History
Send Notification

Explanation
-----------
One event can have multiple listeners.

When emit("login") is called,
Node.js executes every listener
in the order they were registered.
*/

/*=========================================================================
            emit() Passes Data to Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("login", (username, age) => {
  console.log("Username :", username);
  console.log("Age :", age);
});

emitter3.emit("login", "Hardeep", 21);

/*
Output
------

Username : Hardeep
Age : 21

Explanation
-----------
Any arguments passed inside emit()
are received by the listener.
*/

/*=========================================================================
                emit() Return Value
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

emitter4.on("payment", () => {});

console.log(emitter4.emit("payment")); // true

console.log(emitter4.emit("logout")); // false

/*
Output
------

true
false

Explanation
-----------

true
-----
Means at least one listener
was executed.

false
------
Means no listener exists
for that event.
*/

/*=========================================================================
                Internal Working (Conceptual)
=========================================================================*/

/*

Suppose we register:

emitter.on("login", listener1);

emitter.on("login", listener2);

Conceptually, Node.js maintains something like this:

emitter

{

    login: [

        listener1,

        listener2

    ]

}

Now,

emitter.emit("login")

↓

Node.js searches for "login"

↓

Finds the array of listeners

↓

Executes listener1

↓

Executes listener2

NOTE:
-----
This is NOT the actual source code.
This is only a conceptual representation
to understand how EventEmitter works.
*/

/*=========================================================================
                emit() is Synchronous
=========================================================================*/

const EventEmitter = require("events");

const emitter5 = new EventEmitter();

emitter5.on("login", () => {
  console.log("Listener Executed");
});

console.log("Start");

emitter5.emit("login");

console.log("End");

/*
Output
------

Start
Listener Executed
End

Explanation
-----------

emit() executes listeners immediately.

Only after all listeners finish,
the next line of code executes.

Interview Point
---------------
emit() is synchronous by default.

Many beginners think it is asynchronous.

That is incorrect.
*/

/*=========================================================================
            emit() Without Any Listener
=========================================================================*/

const EventEmitter = require("events");

const emitter6 = new EventEmitter();

console.log(emitter6.emit("login"));

/*
Output
------

false

Explanation
-----------

No listener is registered.

So emit() returns false.

No error occurs.
*/

/*=========================================================================
                Production Example
=========================================================================*/

/*

User Login

↓

emit("login", user)

↓

Listener 1
-----------
Generate JWT

↓

Listener 2
-----------
Update Last Login

↓

Listener 3
-----------
Save Login History

↓

Listener 4
-----------
Analytics

↓

Listener 5
-----------
Send Welcome Notification

Advantages
----------
• Loose Coupling

• Easy Maintenance

• Easy Scalability

• Independent Modules

*/

/*=========================================================================
                Common Mistakes
=========================================================================*/

/*

Mistake 1
----------

Thinking emit() registers listeners.

Wrong.

emit() only triggers events.



Mistake 2
----------

Thinking emit() is asynchronous.

Wrong.

emit() is synchronous by default.



Mistake 3
----------

Calling emit() before registering listeners.

Example

emitter.emit("login");

emitter.on("login", callback);

Output

Nothing happens.

Reason

The listener was not registered
when the event was emitted.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. What is emit()?

Q2. What does emit() return?

Q3. Is emit() synchronous or asynchronous?

Q4. What happens if no listener exists?

Q5. Can emit() pass arguments?

Q6. Can one emit() trigger multiple listeners?

Q7. Does emit() register listeners?

Q8. What is the execution order of listeners?

*/

/*=========================================================================
                        Summary
=========================================================================*/

/*

✔ emit() triggers an event.

✔ emit() executes all registered listeners.

✔ emit() is synchronous.

✔ emit() can pass data.

✔ emit() returns true if listeners exist.

✔ emit() returns false if no listeners exist.

✔ One event can trigger multiple listeners.

✔ Listeners execute in registration order.

*/

/*=========================================================================
                    TOPIC 7 : Passing Arguments
=========================================================================*/

/*
Definition
-----------
The emit() method can pass data (arguments) to the registered listeners.

Whenever an event is emitted, additional values can be sent along with
the event. These values are received as parameters inside the listener.

Simple Meaning
--------------
Passing arguments means sending data from emit() to the listener.

Think of it like a function call.

Function Example
----------------

function greet(name) {
    console.log(name);
}

greet("Hardeep");

Similarly,

emit("login", "Hardeep")

↓

listener(name)

↓

"Hardeep"

Syntax
------

emitter.emit(eventName, arg1, arg2, arg3, ...);

emitter.on(eventName, (arg1, arg2, arg3) => {

});

Interview Point
---------------
✔ emit() can send any number of arguments.
✔ Listeners receive arguments in the same order.
✔ Arguments can be Strings, Numbers, Objects, Arrays,
  Booleans, Functions, etc.

=======================================================================
                    Example 1 : Passing One Argument
=======================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", (username) => {
  console.log("Username :", username);
});

emitter.emit("login", "Hardeep");

/*
Output
------

Username : Hardeep

Explanation
-----------

emit()

↓

passes "Hardeep"

↓

listener receives it

↓

prints username

*/

/*=========================================================================
                Example 2 : Passing Multiple Arguments
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", (username, age, city) => {
  console.log(username);

  console.log(age);

  console.log(city);
});

emitter2.emit("login", "Hardeep", 21, "Yamunanagar");

/*
Output
------

Hardeep

21

Yamunanagar

Explanation
-----------

Arguments are received
in the same order.

emit()

↓

username

↓

age

↓

city

*/

/*=========================================================================
                Example 3 : Passing an Object
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("login", (user) => {
  console.log(user.name);

  console.log(user.email);

  console.log(user.age);
});

emitter3.emit("login", {
  name: "Hardeep",

  email: "hardeep@gmail.com",

  age: 21,
});

/*
Output
------

Hardeep

hardeep@gmail.com

21

Explanation
-----------

Instead of sending multiple values,

we send one object.

Production applications
usually follow this approach.
*/

/*=========================================================================
            Why Objects are Better Than Multiple Arguments
=========================================================================*/

/*

Instead of

emit("login",
      "Hardeep",
      21,
      "India",
      "9876543210",
      "Developer");

Use

emit("login", {

    name: "Hardeep",

    age: 21,

    country: "India",

    phone: "9876543210",

    profession: "Developer"

});

Advantages
----------

✔ Clean Code

✔ Easy to Read

✔ Easy to Maintain

✔ Easy to Extend

Production applications
mostly use Objects.

*/

/*=========================================================================
            Example 4 : Passing an Array
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

emitter4.on("numbers", (arr) => {
  console.log(arr);
});

emitter4.emit("numbers", [10, 20, 30, 40]);

/*
Output
------

[10,20,30,40]

Explanation
-----------

Arrays can also be passed
as arguments.

*/

/*=========================================================================
            Example 5 : Passing a Boolean
=========================================================================*/

const EventEmitter = require("events");

const emitter5 = new EventEmitter();

emitter5.on("status", (isLoggedIn) => {
  console.log(isLoggedIn);
});

emitter5.emit("status", true);

/*
Output
------

true

*/

/*=========================================================================
            Example 6 : Passing a Function
=========================================================================*/

const EventEmitter = require("events");

const emitter6 = new EventEmitter();

function greet() {
  console.log("Welcome User");
}

emitter6.on("welcome", (callback) => {
  callback();
});

emitter6.emit("welcome", greet);

/*
Output
------

Welcome User

Explanation
-----------

Functions can also be passed
as arguments because
functions are first-class objects
in JavaScript.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Suppose

emit(

    "login",

    "Hardeep",

    21

);

Node.js conceptually does:

Find "login"

↓

Find listener

↓

listener(

    "Hardeep",

    21

);

Listener

↓

(username, age)

↓

username = "Hardeep"

age = 21

*/

/*=========================================================================
                Real Production Example
=========================================================================*/

/*

User Logs In

↓

emit("login", user)

↓

Listener 1

Generate JWT

↓

Listener 2

Update Last Login

↓

Listener 3

Save Login History

↓

Listener 4

Send Notification

Instead of sending

name,

email,

phone,

role,

age,

country,

etc.

Companies simply send

user Object.

*/

/*=========================================================================
                Common Mistakes
=========================================================================*/

/*

Mistake 1

Passing arguments in different order.

emit("login","Hardeep",21)

↓

listener(age,name)

Wrong.


----------------------------------

Mistake 2

Passing too many primitive values.

Instead

use one object.


----------------------------------

Mistake 3

Changing object inside listener
without understanding
reference behavior.

Objects are passed by reference,
so modifications affect the same object.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. Can emit() pass arguments?

Q2. Can we pass Objects?

Q3. Can we pass Arrays?

Q4. Can we pass Functions?

Q5. Why do production applications
prefer passing Objects instead
of multiple arguments?

Q6. Are arguments received
in the same order?

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ emit() can pass data to listeners.

✔ Listeners receive data as parameters.

✔ Multiple arguments are allowed.

✔ Objects are preferred in production.

✔ Arrays can be passed.

✔ Functions can be passed.

✔ Arguments maintain their order.

✔ Passing an object makes code
   cleaner and easier to maintain.

*/

/*=========================================================================
                    TOPIC 8 : once() Method
=========================================================================*/

/*
Definition
-----------
The once() method registers a listener that is executed
only one time for a specific event.

After executing once, Node.js automatically removes
that listener from memory.

Simple Meaning
--------------
once() means:

"Run this listener only the first time the event occurs."

After the first execution,
the listener is automatically removed.

Syntax
------

emitter.once(eventName, listener);

Parameters
----------

1. eventName
   - Name of the event.

2. listener
   - Callback function to execute only once.

Interview Point
---------------

✔ once() registers a listener.
✔ Listener executes only once.
✔ Node.js automatically removes it.
✔ No need to manually call off().

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.once("login", () => {
  console.log("Welcome User");
});

emitter.emit("login");

emitter.emit("login");

emitter.emit("login");

/*
Output
------

Welcome User

Explanation
-----------

First emit()

↓

Listener executes.

↓

Node.js removes listener.

↓

Second emit()

↓

No listener found.

↓

Nothing happens.

*/

/*=========================================================================
            once() vs on()
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", () => {
  console.log("on()");
});

emitter2.once("login", () => {
  console.log("once()");
});

emitter2.emit("login");

emitter2.emit("login");

/*
Output
------

on()

once()

on()

Explanation
-----------

First emit()

↓

Both listeners execute.

↓

once() listener is removed.

↓

Second emit()

↓

Only on() listener exists.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Suppose

emitter.once("login", callback);

Conceptually

Memory

login

↓

[
   onceListener
]

First emit()

↓

Run callback

↓

Automatically remove listener

↓

Memory

login

↓

[]

Second emit()

↓

No listener

↓

Nothing happens

NOTE
----

This is only a conceptual representation.

Actual Node.js implementation
is different internally.

*/

/*=========================================================================
            Example : Passing Arguments
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.once("login", (username) => {
  console.log(username);
});

emitter3.emit("login", "Hardeep");

emitter3.emit("login", "Rahul");

/*
Output
------

Hardeep

Explanation
-----------

Only the first emit()
executes the listener.

Second emit()
does nothing.

*/

/*=========================================================================
            Example : Multiple once() Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

emitter4.once("login", () => {
  console.log("Generate JWT");
});

emitter4.once("login", () => {
  console.log("Save Login History");
});

emitter4.emit("login");

emitter4.emit("login");

/*
Output
------

Generate JWT

Save Login History

Explanation
-----------

Both listeners execute once.

After execution,

both are removed automatically.

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Application Startup

↓

emit("serverStarted")

↓

Load Environment Variables

↓

Connect Database

↓

Initialize Cache

↓

Log Startup Time

The startup event happens only once.

So once() is a perfect choice.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

OTP Verification

↓

emit("otpVerified")

↓

Give Welcome Bonus

↓

Create Wallet

↓

Send Welcome Email

↓

Listener Removed

OTP verification should happen only once.

Using on()

↓

Risk of duplicate execution.

Using once()

↓

Safer approach.

*/

/*=========================================================================
            Common Use Cases
=========================================================================*/

/*

✔ Server Startup

✔ User First Login

✔ OTP Verification

✔ Initial Configuration

✔ Database Initialization

✔ Cache Initialization

✔ Welcome Bonus

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Thinking once()
prevents the event
from being emitted again.

Wrong.

Event can be emitted
unlimited times.

Only the listener
runs once.

------------------------------------

Mistake 2

Thinking once()
removes all listeners.

Wrong.

It removes only
its own listener.

------------------------------------

Mistake 3

Using once()
where repeated execution
is actually required.

Example

Chat Messages

↓

Wrong

because messages
come many times.

Use on() instead.

*/

/*=========================================================================
            Difference Between on() and once()
=========================================================================*/

/*
 -----------------------------------------------------------------
 | Feature              | on()              | once()              |
 -----------------------------------------------------------------
 | Register Listener    | Yes               | Yes                 |
 | Execute              | Every emit()      | Only first emit()   |
 | Auto Remove          | No                | Yes                 |
 | Manual off() Needed  | Sometimes         | No                  |
 | Production Use       | Repeated Events   | One-Time Events     |
 -----------------------------------------------------------------
 */

/*=========================================================================
            Interview Questions
=========================================================================*/

/*

Q1. What is once()?

Q2. Difference between on() and once()?

Q3. Does once() remove the event?

Q4. Can emit() be called multiple times
after using once()?

Q5. Who removes the listener?

Q6. Is manual off() required?

Q7. Give real production use cases
of once().

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

Use once() only for
one-time operations.

Examples

✔ Server Started

✔ Database Connected

✔ OTP Verified

✔ First Login

✔ Application Boot

Avoid using once()

for

❌ Chat Messages

❌ Notifications

❌ HTTP Requests

❌ Repeated Events

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ once() registers a one-time listener.

✔ Listener executes only once.

✔ Listener is automatically removed.

✔ Event can still be emitted multiple times.

✔ once() is perfect for one-time operations.

✔ No manual cleanup required.

✔ Great for production startup tasks.

*/

/*=========================================================================
                    TOPIC 9 : off() Method
=========================================================================*/

/*
Definition
-----------
The off() method removes a previously registered listener
from a specific event.

Simple Meaning
--------------
off() tells the EventEmitter:

"This listener is no longer needed.
Remove it from the event."

Syntax
------

emitter.off(eventName, listener);

Parameters
----------

1. eventName
   - The name of the event.

2. listener
   - The exact function reference that was registered.

Return Value
------------
Returns the EventEmitter object,
allowing method chaining.

Interview Point
---------------
✔ off() removes only ONE specific listener.
✔ It requires the SAME function reference.
✔ Anonymous functions cannot be removed later.

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

function loginHandler() {
  console.log("User Logged In");
}

emitter.on("login", loginHandler);

emitter.emit("login");

emitter.off("login", loginHandler);

emitter.emit("login");

/*
Output
------

User Logged In

Explanation
-----------

First emit()

↓

Listener executes.

↓

off() removes the listener.

↓

Second emit()

↓

No listener exists.

↓

Nothing happens.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Initially

login

↓

[
   loginHandler
]

After

emitter.off("login", loginHandler)

↓

login

↓

[]

Listener removed.

NOTE
----

This is only a conceptual representation.

The actual Node.js implementation
is different internally.

*/

/*=========================================================================
            Example : Multiple Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

function jwt() {
  console.log("Generate JWT");
}

function history() {
  console.log("Save Login History");
}

emitter2.on("login", jwt);
emitter2.on("login", history);

emitter2.off("login", jwt);

emitter2.emit("login");

/*
Output
------

Save Login History

Explanation
-----------

Only jwt listener was removed.

history listener still exists.

*/

/*=========================================================================
            Important Concept
=========================================================================*/

/*

off() removes only
the specified listener.

It DOES NOT remove
all listeners.

Example

login

↓

[
 JWT,
 History,
 Analytics
]

off("login", JWT)

↓

[
 History,
 Analytics
]

*/

/*=========================================================================
            Anonymous Function Problem
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("login", () => {
  console.log("Login");
});

/*

Wrong

emitter3.off("login", () => {
    console.log("Login");
});

Nothing will be removed.

Reason

Both arrow functions are
different objects in memory.

*/

/*=========================================================================
            Correct Way
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

function greet() {
  console.log("Hello");
}

emitter4.on("welcome", greet);

emitter4.off("welcome", greet);

/*
Correct.

Same function reference
is used.

*/

/*=========================================================================
            Function Reference
=========================================================================*/

/*

JavaScript compares
functions by reference,
NOT by code.

Example

function a(){}

function b(){}

a === b

↓

false

Even if two functions
look identical,

they are different objects.

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Chat Application

↓

User Joins

↓

Register Listener

↓

Receive Messages

↓

User Leaves

↓

off("message", listener)

Reason

No need to keep
old listeners in memory.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Socket Connection

↓

socket.on("message", listener)

↓

Client Disconnects

↓

socket.off("message", listener)

Reason

Avoid unnecessary
memory usage.

*/

/*=========================================================================
            Why Should We Remove Listeners?
=========================================================================*/

/*

If listeners are never removed,

Memory

↓

login

↓

[
 fn1,
 fn2,
 fn3,
 fn4,
 fn5,
 ...
 fn1000
]

Problems

✔ Memory Waste

✔ Duplicate Execution

✔ Performance Issues

✔ Possible Memory Leaks

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Using anonymous functions.

Wrong

emitter.on("login", () => {});

emitter.off("login", () => {});

Reason

Different function references.

-------------------------------------

Mistake 2

Thinking off()
removes all listeners.

Wrong.

It removes only
one specified listener.

-------------------------------------

Mistake 3

Passing the wrong function.

Example

emitter.off("login", anotherFunction);

Nothing happens.

*/

/*=========================================================================
            Difference Between off() and once()
=========================================================================*/

/*
 --------------------------------------------------------------------
 | Feature           | off()                | once()                |
 --------------------------------------------------------------------
 | Purpose           | Remove Listener      | Register One-Time     |
 | Auto Remove       | No                   | Yes                   |
 | Manual Call       | Yes                  | No                    |
 | Removes Listener  | Yes                  | After Execution       |
 --------------------------------------------------------------------
 */

/*=========================================================================
            Interview Questions
=========================================================================*/

/*

Q1. What is off()?

Q2. Why do we use off()?

Q3. Can off() remove anonymous functions?

Q4. Why must the same function reference be passed?

Q5. What happens if the listener does not exist?

Q6. Difference between off() and removeAllListeners()?

Q7. Difference between off() and once()?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use named functions if
you may remove them later.

✔ Always clean up listeners
when they are no longer needed.

✔ Remove listeners when

- User disconnects
- Socket closes
- Component unmounts
- Session ends

✔ Prevent duplicate listeners.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ off() removes a specific listener.

✔ Same function reference is required.

✔ Anonymous listeners cannot
be removed later.

✔ Helps prevent memory leaks.

✔ Improves application performance.

✔ Frequently used in production
applications.

*/

/*=========================================================================
                TOPIC 10 : removeListener() Method
=========================================================================*/

/*
Definition
-----------
The removeListener() method removes a previously registered
listener from a specific event.

It removes only the listener whose function reference
matches the one provided.

Simple Meaning
--------------
removeListener() tells EventEmitter:

"This listener is no longer required.
Remove it from this event."

Syntax
------

emitter.removeListener(eventName, listener);

Parameters
----------

1. eventName
   - Name of the event.

2. listener
   - The exact callback function to remove.

Return Value
------------
Returns the EventEmitter object,
allowing method chaining.

Interview Point
---------------
✔ removeListener() removes one specific listener.
✔ It requires the SAME function reference.
✔ It does NOT remove all listeners.
✔ It is the older version of off().

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

function loginHandler() {
  console.log("User Logged In");
}

emitter.on("login", loginHandler);

emitter.emit("login");

emitter.removeListener("login", loginHandler);

emitter.emit("login");

/*
Output
------

User Logged In

Explanation
-----------

1. Listener is registered.

2. First emit()

↓

Listener executes.

3. removeListener()

↓

Listener is removed.

4. Second emit()

↓

No listener exists.

↓

Nothing happens.

*/

/*=========================================================================
                Internal Working (Conceptual)
=========================================================================*/

/*

Initially

login

↓

[
    loginHandler
]

removeListener("login", loginHandler)

↓

Node.js searches for
the same function reference.

↓

Listener found

↓

Remove it

↓

Memory

login

↓

[]

NOTE

This is only a conceptual representation.

The actual implementation
inside Node.js is different.

*/

/*=========================================================================
            Example : Multiple Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

function jwt() {
  console.log("Generate JWT");
}

function analytics() {
  console.log("Save Analytics");
}

function history() {
  console.log("Save History");
}

emitter2.on("login", jwt);
emitter2.on("login", analytics);
emitter2.on("login", history);

emitter2.removeListener("login", analytics);

emitter2.emit("login");

/*
Output
------

Generate JWT

Save History

Explanation
-----------

Only analytics listener
was removed.

Remaining listeners
still execute.

*/

/*=========================================================================
            Function Reference Requirement
=========================================================================*/

/*

removeListener()
works only when the
same function reference
is passed.

Correct

function greet(){}

emitter.on("login", greet);

emitter.removeListener("login", greet);

Wrong

emitter.on("login", () => {});

emitter.removeListener("login", () => {});

Reason

Both arrow functions
are different objects
in memory.

*/

/*=========================================================================
            Anonymous Function Problem
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("login", () => {
  console.log("Hello");
});

/*

This will NOT work

emitter3.removeListener("login", () => {

    console.log("Hello");

});

Reason

Function reference is different.

*/

/*=========================================================================
            removeListener() vs off()
=========================================================================*/

/*

Modern Node.js

Both methods perform
the same task.

Example

emitter.off("login", handler);

is almost equivalent to

emitter.removeListener("login", handler);

Difference

off()

↓

Modern API
Easy to read
Recommended

removeListener()

↓

Older API
Still supported
Mainly for backward compatibility

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Socket Server

↓

Client Connected

↓

socket.on("message", receiveMessage);

↓

Client Disconnects

↓

socket.removeListener(
    "message",
    receiveMessage
);

Reason

No unnecessary listeners
should remain in memory.

*/

/*=========================================================================
            Why removeListener() is Important
=========================================================================*/

/*

If listeners are never removed

↓

Memory usage increases.

↓

Duplicate listeners
may execute.

↓

Performance decreases.

↓

Memory leak warnings
may appear.

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Using anonymous functions.

Wrong

emitter.on("login", () => {});

emitter.removeListener("login", () => {});

Reason

Different references.

-------------------------------------

Mistake 2

Thinking removeListener()
removes every listener.

Wrong

It removes only one.

-------------------------------------

Mistake 3

Passing wrong function reference.

Nothing will be removed.

*/

/*=========================================================================
            Interview Questions
=========================================================================*/

/*

Q1. What is removeListener()?

Q2. Why do we use removeListener()?

Q3. Difference between off() and removeListener()?

Q4. Why does removeListener()
require the same function reference?

Q5. Can removeListener()
remove anonymous functions?

Q6. What happens if
the listener is not found?

Q7. Difference between
removeListener()
and removeAllListeners()?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use named functions.

✔ Remove listeners
when they are no longer needed.

✔ Avoid duplicate listeners.

✔ Clean up listeners
on socket disconnect,
logout,
or session end.

✔ Prefer off()
for modern applications.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ removeListener()
removes one specific listener.

✔ Same function reference
is required.

✔ Anonymous listeners
cannot be removed later.

✔ Helps prevent memory leaks.

✔ off() is the modern,
preferred alternative.

✔ removeListener()
is still supported
for backward compatibility.

*/

/*=========================================================================
                TOPIC 11 : removeAllListeners() Method
=========================================================================*/

/*
Definition
-----------
The removeAllListeners() method removes all listeners
registered for a specific event or for all events.

Simple Meaning
--------------
removeAllListeners() tells EventEmitter:

"Remove every listener from this event."

OR

"Remove every listener from every event."

Syntax
------

Remove listeners of one event

emitter.removeAllListeners(eventName);

--------------------------------------------

Remove listeners of all events

emitter.removeAllListeners();

Parameters
----------

eventName (Optional)

If provided
↓

Removes listeners of only that event.

If omitted
↓

Removes listeners of ALL events.

Return Value
------------
Returns the EventEmitter object.

Interview Point
---------------
✔ Removes all listeners.
✔ Event name is optional.
✔ Use carefully in production.
✔ Can remove listeners of one event or all events.

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {
  console.log("Generate JWT");
});

emitter.on("login", () => {
  console.log("Save Login History");
});

emitter.emit("login");

emitter.removeAllListeners("login");

emitter.emit("login");

/*
Output
------

Generate JWT

Save Login History

Explanation
-----------

First emit()

↓

Both listeners execute.

↓

removeAllListeners("login")

↓

Both listeners are removed.

↓

Second emit()

↓

Nothing happens.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Initially

login

↓

[
   listener1,
   listener2,
   listener3
]

removeAllListeners("login")

↓

Node.js removes
every listener
from the login event.

↓

Memory

login

↓

[]

NOTE

This is only a conceptual
representation.

Actual implementation
inside Node.js
is different.

*/

/*=========================================================================
            Example : Multiple Events
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", () => {
  console.log("Login");
});

emitter2.on("logout", () => {
  console.log("Logout");
});

emitter2.on("payment", () => {
  console.log("Payment");
});

emitter2.removeAllListeners("login");

emitter2.emit("login");

emitter2.emit("logout");

emitter2.emit("payment");

/*
Output
------

Logout

Payment

Explanation
-----------

Only login listeners
were removed.

logout and payment
still exist.

*/

/*=========================================================================
            Remove All Events
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("login", () => {
  console.log("Login");
});

emitter3.on("logout", () => {
  console.log("Logout");
});

emitter3.on("payment", () => {
  console.log("Payment");
});

emitter3.removeAllListeners();

emitter3.emit("login");

emitter3.emit("logout");

emitter3.emit("payment");

/*
Output
------

Nothing

Explanation
-----------

All events lost
their listeners.

No listener exists.

*/

/*=========================================================================
            Difference Between
            removeListener() and removeAllListeners()
=========================================================================*/

/*

removeListener()

↓

Removes one specific listener.

Example

login

↓

[
 JWT,
 History,
 Analytics
]

removeListener("login", History)

↓

[
 JWT,
 Analytics
]

--------------------------------------------

removeAllListeners()

↓

Removes every listener.

login

↓

[
 JWT,
 History,
 Analytics
]

↓

[]

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Chat Application

↓

User Joins

↓

Register

Message Listener

Typing Listener

Notification Listener

↓

User Leaves

↓

removeAllListeners("message")

Reason

No unnecessary listeners
should remain in memory.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Socket Server

↓

Client Connected

↓

Several listeners
are registered.

↓

Client Disconnects

↓

socket.removeAllListeners();

Reason

Cleanup.

Avoid memory leaks.

*/

/*=========================================================================
            Why is it Important?
=========================================================================*/

/*

Imagine

1000 users connected.

Each user

↓

5 listeners.

User disconnects.

But listeners
are never removed.

Memory

↓

Keeps increasing.

Performance

↓

Decreases.

Possible

↓

Memory Leak.

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Calling

removeAllListeners()

accidentally.

Result

↓

Important listeners
also disappear.

--------------------------------------

Mistake 2

Thinking

removeAllListeners("login")

removes every event.

Wrong.

Only login event
is affected.

--------------------------------------

Mistake 3

Using removeAllListeners()

when only one listener
should be removed.

Use

removeListener()

or

off()

instead.

*/

/*=========================================================================
            Interview Questions
=========================================================================*/

/*

Q1. What is removeAllListeners()?

Q2. Difference between

removeListener()

and

removeAllListeners()?

Q3. Can removeAllListeners()

remove every event?

Q4. Is eventName mandatory?

Q5. What happens if

removeAllListeners()

is called without
an event name?

Q6. Why should we use
it carefully?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use it during cleanup.

✔ Remove listeners
when sockets disconnect.

✔ Remove listeners
when sessions end.

✔ Avoid calling

removeAllListeners()

without understanding
its impact.

✔ Prefer removing
only the required listeners.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ Removes all listeners
of one event.

✔ Event name is optional.

✔ Without event name,

all listeners
of all events
are removed.

✔ Useful for cleanup.

✔ Helps prevent
memory leaks.

✔ Use carefully
in production.

*/

/*=========================================================================
                TOPIC 12 : listenerCount() Method
=========================================================================*/

/*
Definition
-----------
The listenerCount() method returns the number of listeners
currently registered for a specific event.

Simple Meaning
--------------
listenerCount() tells us:

"How many listeners are currently waiting
for this event?"

It is mainly used for

✔ Debugging
✔ Monitoring
✔ Preventing duplicate listeners

Syntax
------

emitter.listenerCount(eventName);

Parameters
----------

eventName

↓

The name of the event
whose listeners you want to count.

Return Value
------------

Returns a Number.

Examples

0

↓

No listeners

2

↓

Two listeners

5

↓

Five listeners

Interview Point
---------------

✔ Returns only the number of listeners.

✔ Does NOT execute listeners.

✔ Does NOT return listener functions.

✔ Mostly used for debugging.

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {});

emitter.on("login", () => {});

console.log(emitter.listenerCount("login"));

/*
Output
------

2

Explanation
-----------

login

↓

[
 listener1,
 listener2
]

Total listeners

↓

2

*/

/*=========================================================================
            Example : Different Events
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", () => {});

emitter2.on("logout", () => {});

emitter2.on("payment", () => {});

console.log(emitter2.listenerCount("login"));

console.log(emitter2.listenerCount("logout"));

console.log(emitter2.listenerCount("payment"));

/*
Output
------

1

1

1

Explanation
-----------

Each event has

only one listener.

*/

/*=========================================================================
            Example : No Listener
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

console.log(emitter3.listenerCount("login"));

/*
Output
------

0

Explanation
-----------

No listener is registered.

Therefore

listenerCount()

returns

0

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Suppose

login

↓

[

 listener1,

 listener2,

 listener3

]

listenerCount("login")

↓

Node.js counts
the listeners
inside the event.

↓

Returns

3

NOTE

This is only
a conceptual diagram.

Internally
Node.js uses
its own optimized implementation.

*/

/*=========================================================================
            Example : After Removing Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

function loginHandler() {}

emitter4.on("login", loginHandler);

console.log(emitter4.listenerCount("login"));

emitter4.off("login", loginHandler);

console.log(emitter4.listenerCount("login"));

/*
Output
------

1

0

Explanation
-----------

Initially

One listener exists.

↓

off()

↓

Listener removed.

↓

Count becomes

0

*/

/*=========================================================================
            Example : Duplicate Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter5 = new EventEmitter();

function greet() {}

emitter5.on("login", greet);

emitter5.on("login", greet);

console.log(emitter5.listenerCount("login"));

/*
Output
------

2

Explanation
-----------

The same function
was registered twice.

Node.js counts

both listeners.

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Suppose

User Login Event

↓

Several modules

register listeners.

Before registering
another listener

↓

Check

listenerCount("login")

↓

If count is already high

↓

Investigate

Possible duplicate listeners.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Socket Server

↓

Every connection

adds listeners.

↓

During debugging

↓

listenerCount("message")

↓

Detect duplicate
message listeners.

*/

/*=========================================================================
            Why is listenerCount() Useful?
=========================================================================*/

/*

Imagine

Every request

adds a new listener.

↓

After 1 hour

↓

50 listeners

↓

Unexpected behavior

↓

listenerCount()

helps detect
the problem.

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Thinking

listenerCount()

returns listeners.

Wrong.

It returns only
the number.

--------------------------------------

Mistake 2

Thinking

listenerCount()

executes listeners.

Wrong.

It simply counts them.

--------------------------------------

Mistake 3

Using listenerCount()

to remove listeners.

Wrong.

Use

off()

or

removeListener()

instead.

*/

/*=========================================================================
            Interview Questions
=========================================================================*/

/*

Q1. What is listenerCount()?

Q2. What does listenerCount() return?

Q3. Can listenerCount()

execute listeners?

Q4. What happens if
no listener exists?

Q5. Why is listenerCount()

useful in production?

Q6. Can duplicate listeners
increase the count?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use during debugging.

✔ Check listener count
before adding
new listeners.

✔ Useful for detecting

duplicate listeners.

✔ Helpful for preventing

memory leaks.

✔ Never use it
to execute listeners.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ listenerCount()
returns the number
of registered listeners.

✔ Returns a Number.

✔ Returns

0

if no listener exists.

✔ Does not execute
listeners.

✔ Very useful
for debugging.

✔ Helps detect
duplicate listeners.

✔ Helps identify
memory leak issues.

*/

/*=========================================================================
                    TOPIC 13 : listeners() Method
=========================================================================*/

/*
Definition
-----------
The listeners() method returns an array containing all
the listener functions registered for a specific event.

Simple Meaning
--------------
listeners() tells us:

"Show me all the callback functions
registered for this event."

Unlike listenerCount(),

listenerCount()

↓

Returns only the number.

listeners()

↓

Returns the actual listener functions.

Syntax
------

emitter.listeners(eventName);

Parameters
----------

eventName

↓

The name of the event whose listeners
you want to retrieve.

Return Value
------------

Returns an Array.

Example

[ listener1, listener2, listener3 ]

Interview Point
---------------

✔ Returns an array of functions.

✔ Does NOT execute the listeners.

✔ Mainly used for debugging
  and inspection.

=========================================================================
                        Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

function loginHandler() {
  console.log("Login");
}

function historyHandler() {
  console.log("History");
}

emitter.on("login", loginHandler);
emitter.on("login", historyHandler);

console.log(emitter.listeners("login"));

/*
Output
------

[
  [Function: loginHandler],
  [Function: historyHandler]
]

Explanation
-----------

listeners("login")

↓

Returns an array

↓

Containing every registered
listener function.

The functions are NOT executed.

*/

/*=========================================================================
                Example : Using .length
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

function a() {}
function b() {}

emitter2.on("login", a);
emitter2.on("login", b);

console.log(emitter2.listeners("login").length);

/*
Output
------

2

Explanation
-----------

listeners()

↓

Returns an array.

.length

↓

Returns the number
of elements
inside that array.

*/

/*=========================================================================
            Example : No Listener Exists
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

console.log(emitter3.listeners("payment"));

/*
Output
------

[]

Explanation
-----------

No listener exists.

Node.js returns
an empty array.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Suppose

login

↓

[

 loginHandler,

 historyHandler,

 analyticsHandler

]

listeners("login")

↓

Node.js returns

[

 loginHandler,

 historyHandler,

 analyticsHandler

]

NOTE

This is only a conceptual
representation.

Internally,
Node.js has its own
optimized implementation.

*/

/*=========================================================================
            Example : Execute Returned Listener
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

function greet() {
  console.log("Hello");
}

emitter4.on("welcome", greet);

const allListeners = emitter4.listeners("welcome");

allListeners[0]();

/*
Output
------

Hello

Explanation
-----------

listeners()

did not execute anything.

It only returned
an array.

We manually called

allListeners[0]()

which executed
the function.

*/

/*=========================================================================
            Difference Between
            listenerCount() and listeners()
=========================================================================*/

/*

listenerCount("login")

↓

Returns

2

----------------------------

listeners("login")

↓

Returns

[
  listener1,
  listener2
]

One returns a Number.

The other returns
an Array.

*/

/*=========================================================================
                Real Production Example
=========================================================================*/

/*

During debugging

↓

Need to inspect

which listeners

are attached

to

"login"

↓

listeners("login")

↓

Returns all
registered callbacks.

Useful when

multiple modules

register listeners.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Large Backend

↓

Many developers

work on same project.

↓

Unexpected behavior.

↓

Inspect

listeners("payment")

↓

Identify

duplicate or unwanted
listeners.

*/

/*=========================================================================
            Why is listeners() Useful?
=========================================================================*/

/*

Sometimes

you know

listeners exist,

but

you don't know

which ones.

listeners()

helps inspect

all registered

callback functions.

*/

/*=========================================================================
                Common Mistakes
=========================================================================*/

/*

Mistake 1

Thinking

listeners()

executes functions.

Wrong.

It only returns
an array.

---------------------------------------

Mistake 2

Thinking

listeners()

returns count.

Wrong.

Use

listenerCount()

for count.

---------------------------------------

Mistake 3

Expecting

null

when no listeners exist.

Wrong.

Node.js returns

[]

Empty Array.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. What is listeners()?

Q2. What does listeners()
return?

Q3. Does listeners()

execute callback functions?

Q4. What is returned
if no listeners exist?

Q5. Difference between

listeners()

and

listenerCount()?

Q6. Why is listeners()

useful in debugging?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use for debugging.

✔ Inspect registered listeners.

✔ Use listenerCount()

if only the total
number is required.

✔ Avoid manually
calling returned listeners
unless absolutely necessary.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ listeners()

returns an array
of listener functions.

✔ Does not execute
any listener.

✔ Returns

[]

if no listener exists.

✔ Useful for debugging.

✔ Different from

listenerCount()

which returns only
the total count.

*/

/*=========================================================================
                    TOPIC 14 : eventNames() Method
=========================================================================*/

/*
Definition
-----------
The eventNames() method returns an array containing the names
of all events that currently have one or more registered listeners.

Simple Meaning
--------------
eventNames() tells us:

"Show me all the event names
that currently have listeners."

It DOES NOT return

❌ Listener Functions

It DOES NOT return

❌ Number of Listeners

It ONLY returns

✔ Event Names

Syntax
------

emitter.eventNames();

Parameters
----------

None

Return Value
------------

Returns an Array.

Example

[
   "login",
   "logout",
   "payment"
]

Interview Point
---------------

✔ Returns only event names.

✔ Does NOT execute any listener.

✔ Does NOT return callback functions.

✔ Mostly used for debugging
   and inspecting EventEmitter.

=========================================================================
                        Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("login", () => {});

emitter.on("logout", () => {});

emitter.on("payment", () => {});

console.log(emitter.eventNames());

/*
Output
------

[
   'login',
   'logout',
   'payment'
]

Explanation
-----------

Three different events

↓

login

logout

payment

Each has at least
one registered listener.

So eventNames()

returns all event names.

*/

/*=========================================================================
            Example : Multiple Listeners
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.on("login", () => {});

emitter2.on("login", () => {});

emitter2.on("login", () => {});

console.log(emitter2.eventNames());

/*
Output
------

[
   'login'
]

Explanation
-----------

Even though

login

has three listeners,

eventNames()

returns only

one event name.

It does NOT return
duplicate names.

*/

/*=========================================================================
            Example : No Events
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

console.log(emitter3.eventNames());

/*
Output
------

[]

Explanation
-----------

No listeners
have been registered.

Therefore

no event names exist.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Suppose

Memory

login

↓

[
 listener1,
 listener2
]

logout

↓

[
 listener3
]

payment

↓

[
 listener4
]

eventNames()

↓

Node.js returns

[
 "login",
 "logout",
 "payment"
]

Notice

Only keys are returned.

Listener functions
are NOT returned.

*/

/*=========================================================================
            Example : After Removing Events
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

emitter4.on("login", () => {});

emitter4.on("logout", () => {});

console.log(emitter4.eventNames());

emitter4.removeAllListeners("login");

console.log(emitter4.eventNames());

/*
Output
------

[
   'login',
   'logout'
]

[
   'logout'
]

Explanation
-----------

Initially

Two events exist.

↓

login removed.

↓

Only logout remains.

*/

/*=========================================================================
            Difference Between
            eventNames()
            and
            listeners()
=========================================================================*/

/*

eventNames()

↓

Returns

[
 "login",
 "logout"
]

----------------------------

listeners("login")

↓

Returns

[
 listener1,
 listener2
]

One returns

Event Names.

The other returns

Listener Functions.

*/

/*=========================================================================
            Difference Between
            eventNames()
            and
            listenerCount()
=========================================================================*/

/*

eventNames()

↓

[
 "login",
 "logout"
]

----------------------------

listenerCount("login")

↓

2

One returns

Event Names.

The other returns

Number of listeners.

*/

/*=========================================================================
                Real Production Example
=========================================================================*/

/*

Suppose

Backend Server

↓

Many modules

register events.

↓

Unexpected behavior.

↓

Developer wants to know

which events

are currently active.

↓

eventNames()

↓

Returns

all active event names.

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Chat Server

↓

Events

message

typing

disconnect

join

leave

↓

eventNames()

↓

Useful for

Debugging

Monitoring

Inspection

*/

/*=========================================================================
            Why is eventNames() Useful?
=========================================================================*/

/*

Sometimes

you know

listeners exist,

but

you don't know

which events

have listeners.

eventNames()

solves that problem.

*/

/*=========================================================================
                Common Mistakes
=========================================================================*/

/*

Mistake 1

Thinking

eventNames()

returns listeners.

Wrong.

It returns

only event names.

----------------------------------------

Mistake 2

Thinking

eventNames()

returns count.

Wrong.

Use

listenerCount()

for count.

----------------------------------------

Mistake 3

Expecting

duplicate names.

Wrong.

Each event name
appears only once.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. What is eventNames()?

Q2. What does eventNames()
return?

Q3. Does eventNames()

execute listeners?

Q4. Difference between

eventNames()

and

listeners()?

Q5. Difference between

eventNames()

and

listenerCount()?

Q6. What is returned
if no event exists?

Q7. Why is eventNames()
useful in production?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Use during debugging.

✔ Inspect registered events.

✔ Useful for monitoring
large applications.

✔ Combine with

listenerCount()

to identify
unexpected listeners.

✔ Do not use
eventNames()

to execute listeners.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ eventNames()

returns an array
of event names.

✔ Does NOT execute
listeners.

✔ Does NOT return
listener functions.

✔ Returns

[]

if no events exist.

✔ Useful for
debugging
and inspection.

✔ Different from

listeners()

and

listenerCount().

*/

/*=========================================================================
                TOPIC 15 : setMaxListeners() Method
=========================================================================*/

/*
Definition
-----------
The setMaxListeners() method is used to change the maximum number
of listeners that can be added to an EventEmitter before Node.js
shows a warning.

Simple Meaning
--------------
Node.js allows adding any number of listeners.

However,

after a certain limit,

Node.js displays

MaxListenersExceededWarning

to warn developers about a possible memory leak.

Using setMaxListeners(),

we can change that warning limit.

Syntax
------

emitter.setMaxListeners(number);

Parameters
----------

number

↓

Maximum number of listeners
allowed before Node.js
shows a warning.

Return Value
------------

Returns the EventEmitter object.

Interview Point
---------------

✔ Default limit is 10 listeners.

✔ It does NOT stop adding listeners.

✔ It only changes the warning threshold.

✔ More than the limit
still works,
but Node.js shows a warning.

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.setMaxListeners(20);

console.log(emitter.getMaxListeners());

/*
Output
------

20

Explanation
-----------

Default limit

↓

10

Changed to

↓

20

*/

/*=========================================================================
            Default Listener Limit
=========================================================================*/

/*

By default

Node.js

↓

10 Listeners

Example

login

↓

Listener1

↓

Listener2

↓

...

↓

Listener10

Everything works.

Adding

Listener11

↓

Node.js displays

MaxListenersExceededWarning

Program DOES NOT stop.

*/

/*=========================================================================
            Example : Warning
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

for (let i = 1; i <= 11; i++) {
  emitter2.on("login", () => {});
}

/*
Result

Node.js prints

MaxListenersExceededWarning

Reason

11 listeners

Default limit

↓

10

*/

/*=========================================================================
            Example : Increase Limit
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.setMaxListeners(20);

for (let i = 1; i <= 15; i++) {
  emitter3.on("login", () => {});
}

/*
Result

No warning.

Reason

Maximum

↓

20

Current

↓

15

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

Node.js internally stores

Current Listeners

↓

15

Maximum Allowed

↓

20

Check

15 > 20 ?

↓

No

↓

No warning.

---------------------------------

If

25 > 20

↓

Warning

MaxListenersExceededWarning

*/

/*=========================================================================
            Why Does Node.js Show This Warning?
=========================================================================*/

/*

Suppose

Every request

↓

Adds a new listener

↓

Listeners are never removed

↓

Memory usage increases

↓

Performance decreases

↓

Possible memory leak

Node.js warns developers
before the problem
becomes serious.

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Chat Server

↓

Thousands of users

↓

Each user

adds listeners

↓

Sometimes

more than

10 listeners

are genuinely required.

↓

Increase limit

using

setMaxListeners()

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Thinking

setMaxListeners()

limits listeners.

Wrong.

It changes

only the warning limit.

-----------------------------------

Mistake 2

Ignoring

MaxListenersExceededWarning

without investigation.

Wrong.

Always check

whether

duplicate listeners

exist.

-----------------------------------

Mistake 3

Setting

1000

without understanding

why.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. What is setMaxListeners()?

Q2. What is the default limit?

Q3. Does it prevent listeners
from being added?

Q4. Why does Node.js
show MaxListenersExceededWarning?

Q5. Is it an error
or a warning?

Q6. Should we always
increase the limit?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Keep default limit
unless necessary.

✔ Investigate warning
before increasing limit.

✔ Remove unnecessary listeners.

✔ Avoid duplicate listeners.

✔ Use higher limit only
when application design
requires it.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ Changes warning limit.

✔ Default value

↓

10

✔ Does NOT stop
listener registration.

✔ Helps avoid
false warnings
in large applications.

✔ Warning
may indicate
memory leaks.

*/

/*=========================================================================
                    TOPIC 17 : error Event
=========================================================================*/

/*
Definition
-----------
The "error" event is a special event in Node.js EventEmitter.

Unlike normal events, if an "error" event is emitted without
an error listener, Node.js throws an exception and terminates
the application.

Simple Meaning
--------------
The error event is used to notify that something went wrong
inside the application.

Examples

✔ Database Connection Failed

✔ File Read Error

✔ Network Error

✔ Payment Failed

✔ Authentication Failed

Interview Point
---------------
✔ "error" is a special event.

✔ If no error listener exists,
   the application crashes.

✔ Always register an error listener.

=========================================================================
                    Basic Example
=========================================================================
*/

const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("error", (err) => {
  console.log("Error :", err.message);
});

emitter.emit("error", new Error("Database Connection Failed"));

/*
Output
------

Error : Database Connection Failed

Explanation
-----------

emit("error")

↓

Node.js finds
the registered
error listener.

↓

Listener executes.

↓

Application continues.

*/

/*=========================================================================
            Example : No Error Listener
=========================================================================*/

const EventEmitter = require("events");

const emitter2 = new EventEmitter();

emitter2.emit("error", new Error("Database Failed"));

/*
Output
------

Unhandled 'error' event

Error: Database Failed

Application crashes.

Explanation
-----------

No error listener exists.

Node.js treats

"error"

as a special event.

Instead of ignoring it,

Node.js throws
an exception and
terminates the process.

*/

/*=========================================================================
            Why is error Event Special?
=========================================================================*/

/*

Normal Event

emit("login")

↓

No listener

↓

Nothing happens.

-------------------------------------

Error Event

emit("error")

↓

No listener

↓

Application crashes.

This is the biggest
difference.

*/

/*=========================================================================
            Internal Working (Conceptual)
=========================================================================*/

/*

emit("error")

↓

Check

Is there
an error listener?

↓

YES

↓

Execute Listener

↓

Continue Program

-----------------------------------

NO

↓

Throw Exception

↓

Crash Application

*/

/*=========================================================================
            Example : Access Error Information
=========================================================================*/

const EventEmitter = require("events");

const emitter3 = new EventEmitter();

emitter3.on("error", (err) => {
  console.log(err.name);

  console.log(err.message);
});

emitter3.emit("error", new Error("File Not Found"));

/*
Output
------

Error

File Not Found

Explanation
-----------

Error object
contains useful properties.

Common Properties

err.name

err.message

err.stack

*/

/*=========================================================================
            Example : Using err.stack
=========================================================================*/

const EventEmitter = require("events");

const emitter4 = new EventEmitter();

emitter4.on("error", (err) => {
  console.log(err.stack);
});

emitter4.emit("error", new Error("Database Failed"));

/*
Output

Complete Stack Trace

Useful for debugging.

*/

/*=========================================================================
            Real Production Example
=========================================================================*/

/*

Database Server

↓

Connection Failed

↓

emit("error", error)

↓

Error Listener

↓

Log Error

↓

Retry Connection

↓

Notify Admin

↓

Continue or Exit Gracefully

*/

/*=========================================================================
            Another Production Example
=========================================================================*/

/*

Payment Gateway

↓

Payment Failed

↓

emit("error", error)

↓

Listener

↓

Save Log

↓

Rollback Transaction

↓

Notify Customer

↓

Notify Admin

*/

/*=========================================================================
            Why Should We Always
            Register an Error Listener?
=========================================================================*/

/*

Without

error listener

↓

Unhandled Error

↓

Node.js crashes

↓

Application stops

-----------------------------------

With

error listener

↓

Error handled

↓

Application remains stable

*/

/*=========================================================================
            throw Error()
            vs
            emit("error")
=========================================================================*/

/*

throw new Error()

↓

Immediately throws
an exception.

↓

Current execution stops.

-----------------------------------

emit("error", error)

↓

Triggers

error event.

↓

If listener exists

↓

Handle gracefully.

↓

Otherwise

↓

Application crashes.

*/

/*=========================================================================
            Common Mistakes
=========================================================================*/

/*

Mistake 1

Ignoring

error listener.

Result

↓

Application Crash.

-------------------------------------

Mistake 2

Passing a String.

Wrong

emit("error", "Database Failed");

Preferred

emit("error",
     new Error("Database Failed"));

Reason

Error object
contains

message

name

stack

-------------------------------------

Mistake 3

Thinking

error

is a normal event.

Wrong.

It is a special event
inside EventEmitter.

*/

/*=========================================================================
                Interview Questions
=========================================================================*/

/*

Q1. Why is the error event special?

Q2. What happens if
no error listener exists?

Q3. Does Node.js ignore
an unhandled error event?

Q4. Difference between

throw new Error()

and

emit("error")?

Q5. Why should we use
new Error() instead
of a string?

Q6. What properties
does the Error object have?

Q7. What is err.stack?

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Always register
an error listener.

✔ Use

new Error()

instead of strings.

✔ Log every error.

✔ Do not ignore
unexpected errors.

✔ Use err.stack
for debugging.

✔ Handle errors
gracefully.

*/

/*=========================================================================
                            Summary
=========================================================================*/

/*

✔ "error" is a special event.

✔ Without an error listener,
the application crashes.

✔ Always use

new Error()

✔ Error object contains

message

name

stack

✔ Register an error listener
in production applications.

✔ Never ignore
Unhandled 'error' events.

*/

/*=========================================================================
                    TOPIC 18 : Interview Questions
=========================================================================*/

/*
=========================================================================
                    Basic Interview Questions
=========================================================================
*/

/*

Q1. What is an Event in Node.js?

Answer
------
An event is an action or occurrence that happens during the execution
of an application.

Examples

✔ User Login
✔ Payment Success
✔ File Upload
✔ Server Started

------------------------------------------------------------

Q2. What is EventEmitter?

Answer
------
EventEmitter is a built-in class provided by the "events" module.
It allows objects to emit events and register listeners.

------------------------------------------------------------

Q3. What is Event Driven Programming?

Answer
------
It is a programming paradigm where the execution flow
depends on events and listeners.

------------------------------------------------------------

Q4. Difference between on() and emit()?

Answer
------

on()

↓

Registers a listener.

emit()

↓

Triggers an event
and executes listeners.

------------------------------------------------------------

Q5. Difference between on() and once()?

Answer
------

on()

↓

Executes every time.

once()

↓

Executes only once.

Automatically removes itself.

------------------------------------------------------------

Q6. Difference between off() and removeListener()?

Answer
------

Functionally

both perform the same task.

off()

↓

Modern API

removeListener()

↓

Older API
kept for backward compatibility.

------------------------------------------------------------

Q7. Difference between
removeListener()
and
removeAllListeners()?

Answer
------

removeListener()

↓

Removes one specific listener.

removeAllListeners()

↓

Removes every listener
for one event
or all events.

------------------------------------------------------------

Q8. What does listenerCount() return?

Answer
------

Returns the total number
of listeners
registered for a specific event.

------------------------------------------------------------

Q9. What does listeners() return?

Answer
------

Returns an array
containing all listener functions.

------------------------------------------------------------

Q10. What does eventNames() return?

Answer
-------

Returns an array
containing all registered
event names.

------------------------------------------------------------

Q11. What is the default maximum
number of listeners?

Answer
------

10

------------------------------------------------------------

Q12. Does setMaxListeners()
limit listeners?

Answer
------

No.

It only changes
the warning threshold.

------------------------------------------------------------

Q13. What is
MaxListenersExceededWarning?

Answer
------

A warning generated by Node.js
when too many listeners
are attached
to the same event.

It may indicate
a possible memory leak.

------------------------------------------------------------

Q14. Is emit()
synchronous or asynchronous?

Answer
------

emit()

is synchronous
by default.

------------------------------------------------------------

Q15. Can emit()
pass arguments?

Answer
------

Yes.

Arguments are received
by the listener.

------------------------------------------------------------

Q16. What happens
if no listener exists?

Answer
------

Normal Event

↓

Nothing happens.

emit()

returns

false.

------------------------------------------------------------

Q17. What is special
about the error event?

Answer
------

Without an

error listener

↓

Node.js throws
an exception

↓

Application crashes.

------------------------------------------------------------

Q18. Difference between

throw new Error()

and

emit("error")?

Answer
------

throw

↓

Throws exception immediately.

emit("error")

↓

Triggers error event.

Requires
an error listener.

------------------------------------------------------------

Q19. Can one event
have multiple listeners?

Answer
------

Yes.

Node.js executes
all listeners
in registration order.

------------------------------------------------------------

Q20. Can the same listener
be registered twice?

Answer
------

Yes.

Node.js allows
duplicate listeners.

Each registration
is executed.

*/

/*=========================================================================
            Most Important Interview Questions
=========================================================================*/

/*

★★★★★

1. Explain EventEmitter.

2. Explain Event Driven Programming.

3. Difference between
on()
and
once()

4. Difference between
emit()
and
on()

5. Why does
MaxListenersExceededWarning
occur?

6. Why is
error event
special?

7. Is emit()
synchronous?

8. How does EventEmitter
work internally?

9. Explain a production
use case of EventEmitter.

10. Difference between
throw Error()

and

emit("error").

*/

/*=========================================================================
                    TOPIC 19 : Production Notes
=========================================================================*/

/*
What is Production?
-------------------

Production means

the real application
used by actual users.

Examples

✔ Amazon

✔ Flipkart

✔ Netflix

✔ Paytm

✔ Swiggy

Production code
must be

Reliable

Scalable

Maintainable

Fast

Secure

=========================================================================

                    Production Use Cases
=========================================================================
*/

/*

Example 1

User Registration

↓

Save User

↓

emit("userRegistered", user)

↓

Listener 1

Send Welcome Email

↓

Listener 2

Generate Coupon

↓

Listener 3

Create User Profile

↓

Listener 4

Analytics

Advantages

✔ Loose Coupling

✔ Easy Maintenance

✔ Easy Scaling

*/

/*=========================================================================
                    Example 2
=========================================================================*/

/*

Order Created

↓

emit("orderCreated")

↓

Inventory Module

↓

Reduce Stock

↓

Invoice Module

↓

Generate Invoice

↓

Notification Module

↓

Send SMS

↓

Analytics Module

↓

Update Dashboard

*/

/*=========================================================================
                    Example 3
=========================================================================*/

/*

Payment Success

↓

emit("paymentSuccess")

↓

Email

↓

Invoice

↓

Reward Points

↓

Analytics

↓

Notification

*/

/*=========================================================================
                    Why Companies Use Events
=========================================================================*/

/*

Without Events

↓

Controller

↓

Email

↓

SMS

↓

Analytics

↓

Invoice

↓

Coupon

↓

Everything inside
one function.

Very difficult
to maintain.

-----------------------------------

With Events

Controller

↓

emit()

↓

Independent Modules

↓

Email

SMS

Analytics

Invoice

Coupon

Cleaner Architecture.

*/

/*=========================================================================
                    Best Practices
=========================================================================*/

/*

✔ Keep listeners
small.

✔ Keep listeners
independent.

✔ Always remove
unused listeners.

✔ Always register
error listeners.

✔ Avoid duplicate listeners.

✔ Use meaningful
event names.

Examples

"userRegistered"

"paymentSuccess"

"orderCreated"

instead of

"abc"

"xyz"

*/

/*=========================================================================
                Common Production Mistakes
=========================================================================*/

/*

❌ Registering
duplicate listeners.

--------------------------------

❌ Ignoring

MaxListenersExceededWarning

--------------------------------

❌ Ignoring
error event.

--------------------------------

❌ Large business logic
inside one listener.

--------------------------------

❌ Not removing
listeners.

--------------------------------

❌ Using events
for everything.

Use them only
when loose coupling
is beneficial.

*/

/*=========================================================================
                Real Backend Architecture
=========================================================================*/

/*

User Registers

↓

Save User

↓

emit("userRegistered")

↓

+-------------------------+
| Email Service           |
+-------------------------+

↓

+-------------------------+
| Coupon Service          |
+-------------------------+

↓

+-------------------------+
| Analytics Service       |
+-------------------------+

↓

+-------------------------+
| Welcome Notification    |
+-------------------------+

Each module
works independently.

No module knows
about the others.

This is called

Loose Coupling.

*/

/*=========================================================================
                        Final Revision
=========================================================================*/

/*

✔ Event

✔ EventEmitter

✔ Event Driven Programming

✔ on()

✔ emit()

✔ Passing Arguments

✔ once()

✔ off()

✔ removeListener()

✔ removeAllListeners()

✔ listenerCount()

✔ listeners()

✔ eventNames()

✔ setMaxListeners()

✔ getMaxListeners()

✔ error Event

✔ Production Use Cases

✔ Interview Questions

Congratulations 🎉

You have completed

Node.js Events

from

Beginner

↓

Interview Level

↓

Production Level.

*/
