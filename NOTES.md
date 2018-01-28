# Steps
1 step per second

on server start
do step
start 1 second timer
when timer ends
do step and restart timer


define do step:
change state
send state (server has a getState endpoint, client constantly checks getState)


define change state:
flip bit


# State
single bit

server sends state to all clients each step
client updates presentation with new state

[x] initial state
[x] some way to chagne server state
[x] define rules that can automiatically change state on server each step


# Client
vanilla js/html



# little steps
[x] server sends state to all clients every step
[x] server tells client when to do step
[x] client does steps on its own

# things to account for
- new clients after game has started
- clients doing actions

# server tells client when to do step
clients not in sync
clients have default initial state
need to get it from server
server sends state to client on connect
not sure if guaranteed that client will be in sync with that method
might want to use step numbers
could make state more complex to increase confidence


# client does steps on its own
client still gets state on connect
but then it starts its own clock and decides when to do the next step
this means less traffic from server
clients are still kind of in sync
but not as well, since  their clock is starting off a little bit
in theory all clients should be within a coupel steps of eachother
ill add more possible states to see what that looks like
yea, eventually, clients have the potential to drift
they get more and more out of sync over time
just the nature of timers
so to mitigate the desync, the server could periodaiclly send its state to all clients
this definitely mitigates the problem, probably fixes it
clients can still drift between sync-ups, but a big deal at the moment