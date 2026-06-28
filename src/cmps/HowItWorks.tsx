import { FaPlus, FaRoute, FaChartPie } from 'react-icons/fa'

type Step = {
  num: number
  title: string
  text: string
  icon: JSX.Element
  accent: string
  iconBg: string
}

const STEPS: Step[] = [
  {
    num: 1,
    title: 'Add your applications',
    text: 'Capture the position, company, location, type, and a description for every job you apply to.',
    icon: <FaPlus className='text-3xl' />,
    accent: 'border-sky-500',
    iconBg: 'bg-sky-200 text-sky-600',
  },
  {
    num: 2,
    title: 'Track every stage',
    text: 'Update the status as you progress and watch the activity timeline build automatically.',
    icon: <FaRoute className='text-3xl' />,
    accent: 'border-indigo-500',
    iconBg: 'bg-indigo-200 text-indigo-600',
  },
  {
    num: 3,
    title: 'See the big picture',
    text: 'Spot trends with the analytics dashboard and plan ahead with the calendar view.',
    icon: <FaChartPie className='text-3xl' />,
    accent: 'border-teal-500',
    iconBg: 'bg-teal-200 text-teal-600',
  },
]

export function HowItWorks() {
  return (
    <section className='bg-zinc-100 py-16'>
      <div className='small-container sm:big-container'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold capitalize'>How it works</h2>
          <p className='mt-3 text-lg text-slate-500'>Three simple steps to take control of your job search.</p>
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {STEPS.map((step) => (
            <div key={step.num} className={`relative bg-white rounded-xl shadow-lg p-8 border-b-4 ${step.accent}`}>
              <span className='absolute top-4 right-5 text-5xl font-bold text-slate-100'>{step.num}</span>
              <div className={`inline-flex p-3 rounded-lg ${step.iconBg}`}>{step.icon}</div>
              <h3 className='mt-4 text-xl font-medium'>{step.title}</h3>
              <p className='mt-2 text-slate-500'>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
