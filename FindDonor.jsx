import React, { useEffect, useState } from 'react'

const groups = ['Any','A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function FindDonor(){
  const [filter, setFilter] = useState({ bloodGroup: 'Any', city: '', availableOnly: true })
  const [donors, setDonors] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchDonors = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filter.bloodGroup && filter.bloodGroup !== 'Any') params.set('bloodGroup', filter.bloodGroup)
      if (filter.city) params.set('city', filter.city)
      if (filter.availableOnly) params.set('available', 'true')
      const res = await fetch('/api/donors?' + params.toString())
      const data = await res.json()
      setDonors(Array.isArray(data) ? data : [])
    } catch(err){
      console.error(err)
      setDonors([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchDonors() }, [])

  return (
    <section className="section">
      <div className="container">
        <h2 style={{margin:'0 0 12px'}}>Find a Donor</h2>
        <div className="card" style={{marginBottom:12}}>
          <div className="grid">
            <div>
              <label>Blood Group</label>
              <select value={filter.bloodGroup} onChange={e=>setFilter(f=>({...f,bloodGroup:e.target.value}))}>
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label>City</label>
              <input placeholder="e.g., Chennai" value={filter.city} onChange={e=>setFilter(f=>({...f, city:e.target.value}))} />
            </div>
            <div style={{display:'flex', alignItems:'end'}}>
              <label style={{display:'flex', gap:8, alignItems:'center'}}>
                <input type="checkbox" checked={filter.availableOnly} onChange={e=>setFilter(f=>({...f, availableOnly:e.target.checked}))} />
                Show only available donors
              </label>
            </div>
          </div>
          <div style={{marginTop:12}}>
            <button onClick={fetchDonors}>Search</button>
            <button className="secondary" style={{marginLeft:8}} onClick={()=>{ setFilter({bloodGroup:'Any', city:'', availableOnly:true}); }}>Reset</button>
          </div>
        </div>

        {loading ? <p>Loading...</p> : (
          <div style={{overflowX:'auto'}}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Blood Group</th>
                  <th>City</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Available</th>
                  <th>Last Donation</th>
                </tr>
              </thead>
              <tbody>
                {donors.length === 0 ? (
                  <tr><td colSpan="7" style={{textAlign:'center', padding:20}}>No donors found.</td></tr>
                ) : donors.map(d => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.bloodGroup}</td>
                    <td>{d.city}</td>
                    <td><a href={`tel:${d.phone}`}>{d.phone}</a></td>
                    <td><a href={`mailto:${d.email}`}>{d.email}</a></td>
                    <td>{d.available ? 'Yes' : 'No'}</td>
                    <td>{d.lastDonationDate ? new Date(d.lastDonationDate).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  )
}
