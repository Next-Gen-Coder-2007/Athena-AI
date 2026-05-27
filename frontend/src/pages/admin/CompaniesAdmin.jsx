import React, { useState, useEffect } from 'react';
import { Admin } from '../../api/api';

const EmptyForm = { name: '', website: '', industry: '', description: '' };

const CompaniesAdmin = () => {
    const [items, setItems] = useState([]);
    const [form, setForm] = useState(EmptyForm);
    const [editingId, setEditingId] = useState(null);

    const load = async () => {
        const res = await Admin.listCompanies();
        setItems(res.data || []);
    };

    useEffect(() => { load(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingId) {
            await Admin.updateCompany(editingId, form);
        } else {
            await Admin.createCompany(form);
        }
        setForm(EmptyForm);
        setEditingId(null);
        load();
    };

    const handleEdit = (s) => {
        setEditingId(s.id);
        setForm({ name: s.name, website: s.website || '', industry: s.industry || '', description: s.description || '', recruiter_id: '' });
    };

    const handleDelete = async (id) => { if (confirm('Delete company?')) { await Admin.deleteCompany(id); load(); } };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Manage Companies</h2>
            <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-2">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" />
                <input name="website" placeholder="Website" value={form.website} onChange={handleChange} className="border p-2" />
                <input name="industry" placeholder="Industry" value={form.industry} onChange={handleChange} className="border p-2" />
                <input name="description" placeholder="Description" value={form.description} onChange={handleChange} className="border p-2" />
                <div className="col-span-2 flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{editingId ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={() => { setForm(EmptyForm); setEditingId(null); }} className="px-4 py-2 border rounded">Reset</button>
                </div>
            </form>

            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left"><th className="p-2">ID</th><th className="p-2">Name</th><th className="p-2">Industry</th><th className="p-2">Actions</th></tr>
                </thead>
                <tbody>
                    {items.map(s => (
                        <tr key={s.id} className="border-t">
                            <td className="p-2">{s.id}</td>
                            <td className="p-2">{s.name}</td>
                            <td className="p-2">{s.industry}</td>
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

export default CompaniesAdmin;
