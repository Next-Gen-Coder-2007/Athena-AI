import React, { useState, useEffect } from 'react';
import { Admin } from '../../api/api';

const EmptyForm = { name: '', email: '', username: '', password: '', company_id: '', position: '' };

const RecruitersAdmin = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EmptyForm);
    const [editingId, setEditingId] = useState(null);
    const [error, setError] = useState('');
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

        if (editingId) {
            await Admin.updateRecruiter(editingId, form);
        } else {
            await Admin.createRecruiter(form);
        }
        setForm(EmptyForm);
        setEditingId(null);
        load();
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
                <input name="name" placeholder="Full name" value={form.name || ''} onChange={handleChange} className="border p-2" required />
                <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className="border p-2" type="email" required />
                <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} className="border p-2" required />
                <input name="password" placeholder="Password" value={form.password || ''} onChange={handleChange} className="border p-2" type="password" required />
                <select name="company_id" value={form.company_id} onChange={handleChange} className="border p-2" required>
                    <option value="">Select company</option>
                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="border p-2" />
                <div className="col-span-2 flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{editingId ? 'Update' : 'Create'}</button>
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
