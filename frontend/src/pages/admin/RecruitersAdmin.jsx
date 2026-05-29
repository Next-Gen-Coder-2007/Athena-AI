import React, { useState, useEffect } from 'react';
import { Admin } from '../../api/api';

const EmptyForm = { name: '', email: '', username: '', password: '', company_id: '', position: '' };

const RecruitersAdmin = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EmptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
    const [info, setInfo] = useState('');
    const [linkMode, setLinkMode] = useState(false);
    const [usernameSuggestion, setUsernameSuggestion] = useState('');
    const [companies, setCompanies] = useState([]);
    const [companyMap, setCompanyMap] = useState({});

    const load = async () => {
        const [rres, cres] = await Promise.all([Admin.listRecruiters(), Admin.listCompanies()]);
        setItems(rres.data || []);
        const comps = cres.data || [];
        setCompanies(comps);
        const map = {};
        comps.forEach(c => map[c.id] = c.name);
        setCompanyMap(map);
    };

    useEffect(() => { load(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setInfo('');
        const creating = !editingId;
        if (creating) {
            if (!form.name || !form.email || !form.username || !form.password) {
                setError('Name, email, username and password are required when creating a user');
                return;
            }
            if (!form.company_id) {
                setError('Please select a company for the recruiter');
                return;
            }
        }

        const payload = { ...form };
        if (payload.company_id === '') delete payload.company_id; else if (payload.company_id != null) payload.company_id = Number(payload.company_id);

        try {
            let res;
            if (linkMode) {
                // linking existing user
                res = await Admin.linkRecruiter(payload);
                setInfo(res.data?.message || 'Linked recruiter');
            } else {
                if (editingId) {
                    res = await Admin.updateRecruiter(editingId, payload);
                } else {
                    res = await Admin.createRecruiter(payload);
                }
                const created = res.data?.created_username;
                if (created && created !== payload.username) {
                    setInfo(`Username taken; created with username: ${created}`);
                }
            }
            setForm(EmptyForm);
            setEditingId(null);
            load();
        } catch (err) {
            console.error('Create/Update recruiter error', err);
            const msg = err.response?.data?.detail || err.message || 'Unexpected error';
            setError(msg);
            // if username/email exists, attempt suggestion for username
            if (msg && msg.toLowerCase().includes('username') ){
                try{
                    const sres = await Admin.suggestUsername(form.username);
                    setUsernameSuggestion(sres.data?.suggestion || '');
                }catch(e){}
            }
        }
    };

    const handleEdit = (s) => {
        setEditingId(s.id);
        setForm({ name: '', email: '', username: '', password: '', company_id: s.company_id || '', position: s.position || '' });
    };

    const handleDelete = async (id) => { if (confirm('Delete recruiter?')) { await Admin.deleteRecruiter(id); load(); } };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Manage Recruiters</h2>
            <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-2">
                {error && <div className="col-span-2 text-red-600">{error}</div>}
                {info && <div className="col-span-2 text-green-600">{info}</div>}
                <div className="col-span-2">
                    <label className="inline-flex items-center"><input type="checkbox" checked={linkMode} onChange={(e)=>setLinkMode(e.target.checked)} className="mr-2"/> Link existing user</label>
                </div>
                <input name="name" placeholder="Full name" value={form.name || ''} onChange={handleChange} className="border p-2" required />
                <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className="border p-2" type="email" required />
                <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} onBlur={async()=>{
                    if(form.username){
                        try{const s=await Admin.suggestUsername(form.username); if(s.data?.suggestion) setUsernameSuggestion(s.data.suggestion);}catch(e){}
                    }
                }} className="border p-2" required />
                {usernameSuggestion && <div className="text-sm text-gray-500">Suggestion: {usernameSuggestion}</div>}
                <input name="password" placeholder="Password" value={form.password || ''} onChange={handleChange} className="border p-2" type="password" required />
                <select name="company_id" value={form.company_id} onChange={handleChange} className="border p-2" required={!linkMode}>
                    <option value="">Select company</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="border p-2" />
                <div className="col-span-2 flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{editingId ? 'Update' : linkMode ? 'Link' : 'Create'}</button>
                    <button type="button" onClick={() => { setForm(EmptyForm); setEditingId(null); }} className="px-4 py-2 border rounded">Reset</button>
                </div>
            </form>

            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left"><th className="p-2">ID</th><th className="p-2">User</th><th className="p-2">Company</th><th className="p-2">Position</th><th className="p-2">Actions</th></tr>
                </thead>
                <tbody>
                    {items.map(s => (
                        <tr key={s.id} className="border-t">
                            <td className="p-2">{s.id}</td>
                            <td className="p-2">{s.user_id}</td>
                            <td className="p-2">{companyMap[s.company_id] || s.company_id}</td>
                            <td className="p-2">{s.position}</td>
                            <td className="p-2">
                                <button onClick={() => handleEdit(s)} className="mr-2 text-sm text-blue-600">Edit</button>
                                <button onClick={() => handleDelete(s.id)} className="text-sm text-red-600">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecruitersAdmin;
