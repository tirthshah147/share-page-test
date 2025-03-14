'use client'

import { FormEvent, useState } from 'react'

export default function Home() {
  const [domain, setDomain] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await addCustomDomainClient(domain)
    // Handle the domain value (e.g., send to API, route to another page, etc.)
  }

  const VERCEL_PROJECT_ID = 'prj_zJOvgVg0nHqEFPyP39MbiuSs4muC'
  const VERCEL_TEAM_ID = 'team_NOSY4ARAL9VDmqn2C5qbkiZ5'
  const VERCEL_AUTH_TOKEN = 'vDUAQ2Nc5YxoX2Hi5WM4Nu4r'

  async function addCustomDomainClient(domain: string) {
    console.log(`Starting domain addition for: "${domain}"`)

    // Step 1: Add domain to the Team (v5 API)
    // try {
    //   const addToTeamUrl = `https://api.vercel.com/v5/domains?teamId=${encodeURIComponent(
    //     VERCEL_TEAM_ID,
    //   )}`
    //   const addTeamRes = await fetch(addToTeamUrl, {
    //     method: 'POST',
    //     headers: {
    //       Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ name: domain }),
    //   })

    //   const addTeamJson = await addTeamRes.json()
    //   if (!addTeamRes.ok || addTeamJson.error) {
    //     console.error(
    //       'Failed to add domain to team:',
    //       addTeamJson.error || addTeamJson,
    //     )
    //     throw new Error(`Failed to add domain "${domain}" to the team.`)
    //   }

    //   console.log(
    //     `Domain "${domain}" successfully added to Team (${VERCEL_TEAM_ID}).`,
    //   )
    // } catch (err) {
    //   console.error('Error adding domain to team:', err)
    //   throw err
    // }

    // Step 2: Attach domain to the specific Project (v10 API)
    try {
      const addToProjectUrl = `https://api.vercel.com/v10/projects/${encodeURIComponent(
        VERCEL_PROJECT_ID,
      )}/domains?teamId=${encodeURIComponent(VERCEL_TEAM_ID)}`
      const addProjectRes = await fetch(addToProjectUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: domain }),
      })

      const addProjectJson = await addProjectRes.json()
      if (!addProjectRes.ok || addProjectJson.error) {
        console.error(
          'Failed to attach domain to project:',
          addProjectJson.error || addProjectJson,
        )
        throw new Error(`Failed to attach domain "${domain}" to the project.`)
      }

      console.log(
        `Domain "${domain}" successfully attached to Project (${VERCEL_PROJECT_ID}).`,
      )
      return addProjectJson
    } catch (err) {
      console.error('Error attaching domain to project:', err)
      throw err
    }
  }

  async function vercelDomainStatus() {
    const domainUrl = `https://api.vercel.com/v10/domains/${domain}/config?teamId=${VERCEL_TEAM_ID}`
    const domainUrlError = `failed to get status for custom domain "${domain}")`
    let domainJson

    try {
      const domainRes = await fetch(domainUrl, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${VERCEL_AUTH_TOKEN}`,
          'Content-Type': 'application/json',
        },
      })

      domainJson = await domainRes.json()
      console.info(domainJson, `retrieve domain status for ${domain}`)
    } catch (e) {
      console.error(e, domainUrlError)
    }

    if (domainJson.error) {
      console.error(domainUrlError)
    }

    return domainJson
  }

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-100 p-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-6 shadow'>
        <h1 className='mb-4 text-2xl font-semibold'>Add Your Domain</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label
              htmlFor='domain'
              className='mb-1 block font-medium text-gray-700'
            >
              Enter Domain
            </label>
            <input
              id='domain'
              type='text'
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder='mydomain.com'
              required
              className='w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none'
            />
          </div>

          <button
            type='submit'
            className='w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          >
            Submit
          </button>
        </form>
        <br />
        <button
          className='w-full rounded-md bg-black px-4 py-2 font-semibold text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2'
          onClick={() => vercelDomainStatus()}
        >
          Verify
        </button>
      </div>
    </main>
  )
}
