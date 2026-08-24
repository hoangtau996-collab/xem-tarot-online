// English rendering of the five-aspect reading for each of the 78 cards.
//
// Keyed by card id so the deck can be filled in one suit at a time; anything
// not listed here falls back to the Vietnamese text (see ../cardText.js).
//
// These are not literal translations. The Vietnamese originals are written in
// the voice of a reader speaking to someone sitting across the table, so the
// English keeps that register - second person, plain words, advice you can act
// on - rather than the flat tone a word-for-word pass would produce.
//
// House style, matching the English already in utils/tarotEngine.js: no
// contractions. "does not" rather than "doesn't". It reads a shade more formal
// on the page and it keeps every string safely inside single quotes.

export const EN_MAJOR = {

  /* ---------------- MAJOR ARCANA ---------------- */

  'major-0': {
    upright: {
      situation: 'You are standing at the start line of a new cycle. Meet what comes without letting old fear or old opinion decide for you first.',
      love: 'A fresh current runs through your love life. If you are single, someone is about to stir something new in you; if you are with someone, make room for small happy surprises.',
      work: 'An ideal moment to launch a project, change direction, or try a field you have never worked in. Creative freedom is the key here.',
      finance: 'New money opportunities appear. Take the risk, but take it with the numbers in front of you, not on impulse.',
      advice: 'Trust the universe and walk with an open heart. Do not let the fear of failing hold your feet down.'
    },
    reversed: {
      situation: 'You may be acting without thinking it through, or the opposite - so wary of risk that you have locked yourself into the same worn path.',
      love: 'Be careful with sudden decisions of the heart. Do not promise anything you are not ready to stand behind.',
      work: 'Avoid improvising without a plan. Go through the details carefully before you sign anything.',
      finance: 'A warning about impulse spending that leaves you short. Manage the budget more closely.',
      advice: 'Slow down long enough to think about consequences before you jump. Freedom only works when responsibility comes with it.'
    }
  },

  'major-1': {
    upright: {
      situation: 'You are focused and full of creative energy. The resources you need are within reach of your goal.',
      love: 'This relationship rewards initiative. You have real magnetism right now and a way of inspiring the person in front of you.',
      work: 'A moment for a real breakthrough in your career. Your communication, your problem solving, and your own ability are all working at full strength.',
      finance: 'A strong chance of creating new income from your own talent and ideas. Act rather than wait.',
      advice: 'Line up your will and your goal. Use everything you have, with confidence, to build the reality you want.'
    },
    reversed: {
      situation: 'You are not using what you already have, or you doubt yourself despite being fully capable.',
      love: 'Watch for insincerity, or for someone playing on your feelings.',
      work: 'Do not promise more than you can carry. Put the time into your skills instead of looking for a shortcut.',
      finance: 'Be wary of get-rich schemes that stay vague when you ask questions, and of outright fraud.',
      advice: 'Check your motive and practise being honest with yourself before you act.'
    }
  },

  'major-2': {
    upright: {
      situation: 'You are in a season of deep reflection. Outward action is not always the answer; sometimes the work is quiet watching.',
      love: 'A connection that runs deeper than words. Some feelings here need time before they can be spoken.',
      work: 'Trust your own read of the situation when you decide. Keep strategic ideas to yourself for now.',
      finance: 'Stay careful. Do not rush into an investment while there is information you have not seen yet.',
      advice: 'Give yourself quiet time. Right now your intuition is the most accurate light you have.'
    },
    reversed: {
      situation: 'You are moving with the pressure of the crowd and stepping over your own honest inner voice.',
      love: 'Something is not being shared honestly, or a secret is putting distance between you.',
      work: 'Information is being withheld, or something got lost in translation at work. Ask until it is clear.',
      finance: 'Watch for financial risk hiding under an attractive surface.',
      advice: 'Stop, step away from the outside noise, and practise listening to what you already know.'
    }
  },

  'major-3': {
    upright: {
      situation: 'Creative energy and real growth are gathered around you. Let yourself enjoy being alive.',
      love: 'Love rises, warm and deeply connected. This marks a happy step forward.',
      work: 'Your projects are bearing fruit. The atmosphere around you is harmonious and it feeds your creativity.',
      finance: 'Money is plentiful and steady, with a pattern of sustainable growth.',
      advice: 'Love yourself and love the natural world. Let your care and kindness reach the people around you.'
    },
    reversed: {
      situation: 'You feel drained from giving so much that you forgot to look after yourself.',
      love: 'Avoid controlling too tightly, and avoid sacrificing so much that you lose your own footing.',
      work: 'Creativity is blocked. Rest and refill rather than forcing yourself through it.',
      finance: 'Overspending on luxuries you do not need. Bring income and outgoings back into balance.',
      advice: 'Put your own love and healing first, then turn to care for everyone else.'
    }
  },

  'major-4': {
    upright: {
      situation: 'You need to lead your own life right now. Build a solid plan and carry it out seriously.',
      love: 'Love built on commitment, safety, and real responsibility from both sides.',
      work: 'A time to set up process, establish your standing, and lead a team toward a shared goal.',
      finance: 'Methodical money management, systematic investment, and firm protection of what you have earned.',
      advice: 'Stay steady, principled, and disciplined. Your strength comes from clarity and nerve.'
    },
    reversed: {
      situation: 'You may be controlling too much, or the reverse - short on discipline, and things are sliding into disorder.',
      love: 'Avoid heavy-handedness and do not impose your view on your partner.',
      work: 'Conflict with someone above you, or a process so bulky it blocks any flexibility.',
      finance: 'Cash flow is slipping out of control, or an investment is far too risky for the thinking behind it.',
      advice: 'Soften where softening is needed. A good leader is one who listens and can bend.'
    }
  },

  'major-5': {
    upright: {
      situation: 'You are looking for direction grounded in solid values, or learning from a teacher you respect.',
      love: 'A relationship heading toward traditional commitment - engagement, marriage - and toward shared values.',
      work: 'You do well in an organisation with clear structure, learning from those above you or deepening your professional level.',
      finance: 'Choose safe, established investment channels and take advice from someone who does this for a living.',
      advice: 'Respect the values at your core and look for knowledge with a proven standard behind it.'
    },
    reversed: {
      situation: 'The current rules no longer fit you and you want out of the mould.',
      love: 'A relationship that runs against the grain of what most people expect, or one that needs its own definitions written by the two of you.',
      work: 'Challenge the rules that have outlived their use and build a better way of working.',
      finance: 'Look for financial answers outside the traditional models.',
      advice: 'Have the nerve to think for yourself, while still respecting what history has already taught.'
    }
  },

  'major-6': {
    upright: {
      situation: 'You are standing in front of a choice that will shape your life. Choose the road that matches your core values.',
      love: 'Love that is warm, mutual, and genuinely understood on both sides.',
      work: 'Partnership that clicks, a collaborator you can trust, and a career decision that calls for honesty.',
      finance: 'Weigh reason against personal desire before you spend or before you go into business with someone.',
      advice: 'Listen to what your heart is telling you and choose in a way you can live with.'
    },
    reversed: {
      situation: 'You feel pulled apart between options, or disconnected from yourself.',
      love: 'A gap has opened in how you talk to each other, or your values no longer line up.',
      work: 'Friction in a partnership, ideas clashing with a colleague.',
      finance: 'A money decision made without enough thought has thrown your cash flow off.',
      advice: 'Heal the break inside before you commit to anything on the outside.'
    }
  },

  'major-7': {
    upright: {
      situation: 'You have the strength to hold two opposing forces steady and keep moving toward the goal.',
      love: 'Go after love directly, past the distance or the early obstacles.',
      work: 'Concentrate everything on finishing the goal. Your career moves forward on the strength of your determination.',
      finance: 'Good control of the budget and decisive planning for building assets.',
      advice: 'Hold the wheel, keep your eyes on the goal, and do not let anything pull them away.'
    },
    reversed: {
      situation: 'You may feel out of control, or be pushing the situation faster than you can handle it.',
      love: 'Rushing feelings puts pressure on the other person.',
      work: 'A lack of preparation is knocking the plan off course. Look at the strategy again.',
      finance: 'Avoid hot investment decisions made on feeling with no analysis behind them.',
      advice: 'Let go of the impatient ego and get calm again before you press the accelerator.'
    }
  },

  'major-8': {
    upright: {
      situation: 'Real strength is not force. It is the ability to win people over through understanding and a steady temper.',
      love: 'Love that is honest, forgiving, and deeply understanding. You have a real capacity to soothe and heal the other person.',
      work: 'Handle complicated conflicts with tact, patience, and inner steadiness.',
      finance: 'Smart money management, patient accumulation, no gambling required.',
      advice: 'Be gentle with yourself and with others. Soft strength outlasts any storm.'
    },
    reversed: {
      situation: 'You doubt your own ability, or difficulty makes your temper flare quickly.',
      love: 'Low self-worth stops you showing what you feel, or makes suspicion appear where there is no cause.',
      work: 'Patience with colleagues is thin, or long pressure has worn you down.',
      finance: 'Excess worry about money is pushing you into passive decisions.',
      advice: 'Remind yourself what you have already come through. You are stronger than you think.'
    }
  },

  'major-9': {
    upright: {
      situation: 'This is the pause you need to light up your own mind, to reset how you want to live and where you are going.',
      love: 'A necessary quiet stretch to work out what you truly want before making a long commitment.',
      work: 'Study deeply and sharpen your craft on your own rather than following the crowd.',
      finance: 'Save, live simply, and reconsider what material things are actually worth to you.',
      advice: 'Value the quiet hours alone. The lamp you carry inside will light the next step.'
    },
    reversed: {
      situation: 'You may be isolating too far, or avoiding contact with the world entirely.',
      love: 'Feeling alone inside a relationship, or deliberately keeping the door of your heart shut.',
      work: 'Drifting from reality and out of touch with your team is slowing the work down.',
      finance: 'Tightening spending past the point of sense.',
      advice: 'Open the door and step into the light. Reflection needs to reconnect with real life.'
    }
  },

  'major-10': {
    upright: {
      situation: 'Good change is on the way. Stay flexible so you can meet the openings as they arrive.',
      love: 'A meeting that feels fated, or a turning point that moves the relationship onto brighter ground.',
      work: 'A window for promotion, a smooth move to a new role, or meeting someone who matters to your work.',
      finance: 'Luck turns your way with money. Income improves, or a result arrives sooner than expected.',
      advice: 'Be ready to take the opening. Adapt quickly to the way things are moving.'
    },
    reversed: {
      situation: 'A stretch that tests your patience. Do not despair - every cycle is temporary by definition.',
      love: 'The relationship is in a quiet, heavy phase. Be patient and go through it together.',
      work: 'Delays or staffing changes outside your control. Have a fallback ready.',
      finance: 'Be careful with money swings. Keep away from risky investment for now.',
      advice: 'Everything runs in cycles. Stay calm and stay with it - the wheel comes back up.'
    }
  },

  'major-11': {
    upright: {
      situation: 'You are at the point where earlier choices show their results plainly. Look straight at the truth instead of building a case for yourself.',
      love: 'This relationship needs fairness from both sides. If one of you has been giving more for a long time, now is when to say so and rebalance it.',
      work: 'A good window for contracts, agreements, and legal matters, as long as you are transparent. Your integrity is being noticed.',
      finance: 'Money needs a clear, square review. Debts, tax, or dividing assets will be settled properly.',
      advice: 'Choose the right thing over the easy thing. A decision built on the truth today is what protects you later.'
    },
    reversed: {
      situation: 'You may be making excuses for yourself, or being judged unfairly. That knot of resentment is the sign that you need to speak.',
      love: 'The balance has tipped and one of you is carrying the loss. Skip the blame and talk about specific needs.',
      work: 'Be careful with a contract carrying terms that work against you or terms you have not been shown. Read it closely and ask again.',
      finance: 'Risk of a dispute over money, or unclear spending that nobody has explained. Keep every receipt.',
      advice: 'Be honest with yourself before you ask anyone else to be fair with you.'
    }
  },

  'major-12': {
    upright: {
      situation: 'Everything seems to have stopped and you cannot force it forward. This is a pause for looking again, not a punishment.',
      love: 'This needs time to settle rather than a forced answer. Try standing where the other person is standing.',
      work: 'The project has stalled for reasons outside your control. Use the time to review your approach instead of burning on impatience.',
      finance: 'Not the moment for investing or for any large money decision. Hold your position and watch a while longer - that is the smart move.',
      advice: 'Stop struggling. Let go of the thing you are gripping and the answer surfaces on its own.'
    },
    reversed: {
      situation: 'You are stuck because of your own delay, not because of circumstance. It is time to move.',
      love: 'You may be giving up far more than anyone has acknowledged. Reconsider what all this waiting is buying you.',
      work: 'Drawn-out hesitation is costing you the opening. Commit to a decision even if it is not perfect.',
      finance: 'Putting off a money problem is making it more expensive. Facing it early costs less.',
      advice: 'Waiting helps up to a point. Past that point, it becomes avoidance.'
    }
  },

  'major-13': {
    upright: {
      situation: 'Something in your life has finished its work. The tighter you hold on, the more the change is going to hurt.',
      love: 'A relationship, or an old way of loving, is ending to make room for something more honest.',
      work: 'A large change of work: leaving, changing field, or closing out a long project. This turning point is necessary.',
      finance: 'The old financial shape no longer fits. Cut the spending, or the income stream that has run dry, without flinching.',
      advice: 'Let what is finished go kindly. That empty space is exactly where the new thing walks in.'
    },
    reversed: {
      situation: 'You know very well what needs to end and you keep postponing it. The fear of the change has grown larger than the change itself.',
      love: 'The relationship is spent but you both hold on out of habit. Living in that half-place hurts you both.',
      work: 'Clinging to a role or a project with no future in it. Be honest with yourself about that.',
      finance: 'You are holding a losing investment because letting go feels like waste. Cutting a loss at the right time is a skill.',
      advice: 'Endings only hurt while you fight them. Once accepted, they turn into the way through.'
    }
  },

  'major-14': {
    upright: {
      situation: 'You are finding your balance after a period of being knocked about. Keep this pace and do not rush it.',
      love: 'The relationship moves into calm and mutual understanding. Giving way at the right moments lets you both breathe.',
      work: 'The team works in step and everyone finds common ground. Collaboration beats going alone right now.',
      finance: 'Money is stable because your spending is moderate. This is a time for steady saving, not big bets.',
      advice: 'Do not swing to an extreme in any direction. The right dose is the thing you can keep up.'
    },
    reversed: {
      situation: 'You are pouring everything into one area and neglecting the rest of your life. Your body will be the first to mention it.',
      love: 'One of you is asking too much too fast and the other is suffocating. Ease off.',
      work: 'Overwork, or carrying too many tasks, and the quality is dropping. Cutting back is the rescue.',
      finance: 'Erratic spending - too free one week, too tight the next. Set one fixed limit and hold to it.',
      advice: 'Stop and ask yourself where the moderation is missing, then fix that exact spot.'
    }
  },

  'major-15': {
    upright: {
      situation: 'A habit, a relationship, or an obsession has a grip on you. The first step is calling it by its real name.',
      love: 'A bond weighted toward physical craving or dependence rather than healthy love. Look at it clearly.',
      work: 'You stay for the money or out of fear, not because the work still means anything. Be careful with agreements that tie you down.',
      finance: 'Risk of debt, impulse buying, or gambling. Easy money here carries a price you cannot see yet.',
      advice: 'Look straight at your own shadow. What you admit to loses its power over you.'
    },
    reversed: {
      situation: 'The awareness has arrived and you are working your way out, step by step. It takes time - do not lose heart.',
      love: 'You have recognised the relationship is toxic and you are brave enough to draw a line. That is a good sign.',
      work: 'You are ready to leave the place that has been holding you back. Prepare properly before you step.',
      finance: 'You are starting to pay down debt and getting your spending discipline back. Keep the momentum.',
      advice: 'Freedom starts at the moment you admit you are bound. Keep going.'
    }
  },

  'major-16': {
    upright: {
      situation: 'Things are changing fast and not the way you wanted. Get safe first and analyse afterwards.',
      love: 'A hidden truth comes out and shakes the relationship. After the shock, everything will be more real.',
      work: 'Sudden upheaval: restructuring, losing a project, or a plan overturned. Flexibility matters more right now than the old plan.',
      finance: 'Risk of an unexpected loss. Keep a reserve and avoid putting everything in one place.',
      advice: 'Do not rebuild exactly what just fell down. Ask what was actually holding it up.'
    },
    reversed: {
      situation: 'You can sense the danger and you are trying to keep things from collapsing. Work out what genuinely needs saving.',
      love: 'The relationship is shaking but not over. If you choose to keep it, repair the foundation, not the surface.',
      work: 'A crisis handled in time. Take the lesson so it does not come round again.',
      finance: 'You avoided a bad money decision. Go back and check what risk is still sitting there.',
      advice: 'Taking down what has rotted, on your own terms, beats waiting for it to fall on your head.'
    }
  },

  'major-17': {
    upright: {
      situation: 'You are moving into recovery and the road ahead is clearer. Trust what you are sensing.',
      love: 'Gentle, sincere feeling returns. This is the time to heal the old wounds in the relationship.',
      work: 'Inspiration and career direction come into focus. The opening arrives through what you genuinely love.',
      finance: 'Money steadies again after a hard stretch. Go one step at a time and do not force it.',
      advice: 'Keep your hope and keep walking toward the small light you can see. It is pointing the right way.'
    },
    reversed: {
      situation: 'Everything feels pointless and you have lost the thread to your goal. Look after yourself first.',
      love: 'Disappointment has closed you off. Do not draw a conclusion about everything from one experience.',
      work: 'Motivation gone, or you are chasing a dream with no practical ground under it. You need a more concrete plan.',
      finance: 'Your expected returns are far more optimistic than reality. Redo the sums.',
      advice: 'Bring your expectations down to something real, then restart from one small step you can do today.'
    }
  },

  'major-18': {
    upright: {
      situation: 'You have an uneasy feeling you cannot yet name. Do not make a large decision while things are this hazy.',
      love: 'Something between you has not been said. Most of the doubt right now comes from missing information.',
      work: 'The information is incomplete, or somebody has not told you everything. Ask directly instead of filling the gap yourself.',
      finance: 'Be careful with any money offer that will not explain itself. If it stays vague, keep your wallet closed.',
      advice: 'Wait for more light before you walk. In the meantime, write down your dreams and your hunches.'
    },
    reversed: {
      situation: 'You are starting to see clearly what had you confused. The truth is usually lighter than the imagining of it.',
      love: 'A misunderstanding clears once you both speak plainly.',
      work: 'What was hidden comes into the open. You now have enough facts to decide.',
      finance: 'You spot the unclear expense or the offer that does not hold up, and stop in time.',
      advice: 'Trust what you have just seen, and do not walk back into fooling yourself again.'
    }
  },

  'major-19': {
    upright: {
      situation: 'You are in a bright, energetic stretch and people can see it. Enjoy it and pass the good on.',
      love: 'Warm, honest, unhidden affection. Good news about engagement, marriage, or children may arrive.',
      work: 'Your results are being recognised clearly. A good time to launch something or take a larger role.',
      finance: 'Money brightens, income rises, investments pay. Stay humble with it.',
      advice: 'Live as who you actually are. Your sincerity is the thing that shines.'
    },
    reversed: {
      situation: 'You feel tired even though everything looks fine from outside. Rest instead of pushing on.',
      love: 'The easy joy that used to be there is missing. You need real time together, not time in the same room.',
      work: 'Success is arriving slower than you planned, or your confidence has run ahead of your preparation.',
      finance: 'Do not spend income that is not in the account yet. Wait until the money actually lands.',
      advice: 'Find the small daily pleasures again. The light has not gone anywhere - you are just not looking at it.'
    }
  },

  'major-20': {
    upright: {
      situation: 'You are at the summing-up of a long chapter. What you learned decides what comes next.',
      love: 'A chance to repair, or to pick up an old relationship again, if both of you have genuinely grown.',
      work: 'An opportunity that matches your ability and your values appears. Do not miss it through lack of confidence.',
      finance: 'Time to review your whole financial picture and make one large, clean decision.',
      advice: 'Forgive the older version of yourself and step forward. You have earned this call.'
    },
    reversed: {
      situation: 'You are stuck putting yourself on trial over what is already done. That does not repair the past.',
      love: 'An inability to forgive is keeping the relationship from moving. Decide: let go completely, or genuinely begin again.',
      work: 'You know you should change direction and you keep sidestepping it. The hesitation is spending your own time.',
      finance: 'You avoid looking at the real numbers so the problem waits. Looking at them is the first step.',
      advice: 'Stop sentencing yourself. The lesson has been learned - now use it.'
    }
  },

  'major-21': {
    upright: {
      situation: 'You are closing a long journey with a result you have earned. Stop and let that count.',
      love: 'The relationship reaches real harmony and full commitment. This is the complete part of the cycle.',
      work: 'The project is finished and the goal is met. A new door, possibly an international one, is opening.',
      finance: 'You reach the financial milestone you set. Use this base for the next cycle.',
      advice: 'Celebrate the road behind you before you start the next one. You went the whole way.'
    },
    reversed: {
      situation: 'You are close to the finish with one piece still unresolved. Do not walk away now.',
      love: 'The relationship has not reached the commitment one of you is waiting for. Say plainly what is missing.',
      work: 'The project is running long because of the final stretch. Concentrate on closing it rather than opening something new.',
      finance: 'The financial goal is nearly there but not signed off. Hold on a little longer.',
      advice: 'Finish what is still open. The new cycle only begins once this one closes.'
    }
  }

};
