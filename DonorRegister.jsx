import React, { useState } from 'react'

const groups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

export default function DonorRegister(){
  const [form, setForm] = useState({
    name: '', age: '', gender: 'Male', bloodGroup: 'O+',
    phone: '', email: '', city: '', lastDonationDate: '', available: true
  })
  const [msg, setMsg] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Failed to save')
      setMsg({ type: 'success', text: 'Thank you! You are registered as a donor.' })
      setForm({
        name: '', age: '', gender: 'Male', bloodGroup: 'O+',
        phone: '', email: '', city: '', lastDonationDate: '', available: true
      })
    } catch(err) {
      setMsg({ type: 'error', text: err.message })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section">
      <div className="container">
        <h2 style={{margin:'0 0 12px'}}>Become a Blood Donor</h2>
        <p style={{margin:'0 0 16px'}}>Fill your details below. We will use this information to match patients with suitable donors.</p>
        <form onSubmit={submit}>
          <div className="grid">
            <div>
              <label>Name</label>
              <input name="name" value={form.name} onChange={onChange} required />
            </div>
            <div>
              <label>Age (18–65)</label>
              <input name="age" type="number" min="18" max="65" value={form.age} onChange={onChange} required />
            </div>
            <div>
              <label>Gender</label>
              <select name="gender" value={form.gender} onChange={onChange} required>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label>Blood Group</label>
              <select name="bloodGroup" value={form.bloodGroup} onChange={onChange} required>
                {groups.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div>
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={onChange} placeholder="10-digit mobile" required />
            </div>
            <div>
              <label>Email</label>
              <input name="email" type="email" value={form.email} onChange={onChange} required />
            </div>
            <div>
              <label>City</label>
              <input name="city" value={form.city} onChange={onChange} placeholder="e.g., Chennai" required />
            </div>
            <div>
              <label>Last Donation Date (optional)</label>
              <input name="lastDonationDate" type="date" value={form.lastDonationDate} onChange={onChange} />
            </div>
            <div>
              <label><input type="checkbox" name="available" checked={form.available} onChange={onChange}/> Available to donate</label>
            </div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button disabled={submitting} type="submit">{submitting ? 'Saving...' : 'Save as Donor'}</button>
            <button type="button" className="secondary" onClick={() => setForm({
              name: '', age: '', gender: 'Male', bloodGroup: 'O+',
              phone: '', email: '', city: '', lastDonationDate: '', available: true
            })}>Reset</button>
          </div>
          {msg && <div className="alert" style={{borderColor: msg.type==='error' ? '#ffb3b3':'#d5e7ff', background: msg.type==='error' ? '#fff5f5' : '#f1f7ff'}}>{msg.text}</div>}
        </form>
      </div>
    </section>
  )
}
