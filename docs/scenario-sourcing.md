# Scenario Sourcing

## What To Collect

We do not need random trivia questions.
We need situations that force the player to think in order.

Good source patterns:

- traffic spike
- deployment regression
- login or payment failure
- third-party dependency outage
- cache inconsistency
- database bottleneck
- observability gaps
- data integrity risk
- incident communication under pressure
- tradeoff between fast recovery and perfect diagnosis

## Good Input Sources

- engineering blogs from product companies
- outage postmortems
- reliability and incident writeups
- system design interview prompts
- company tech talks

## Transformation Rule

Turn a source incident into three layers:

1. battle flavor
2. field conditions
3. interview question

Example:

- source event: deployment caused elevated login latency
- field conditions: `recent deploy`, `traffic spike`, `partial observability`
- question: `What would you check first, and how would you reduce user impact?`

## Content Quality Bar

A scenario is good if:

- the stakes are understandable in one read
- there is no single magic answer
- prioritization matters
- follow-up questions are easy to ask
- it teaches a reusable pattern

## Avoid

- puzzle questions with hidden tricks
- obscure vendor-specific gotchas
- situations that require domain knowledge the player could never infer
