import React, { useState, useEffect } from 'react';
import { Admin } from '../../api/api';

const EmptyForm = { user_id: '', name: '', email: '', username: '', password: '', college_name: '', department: '', graduation_year: '', cgpa: '', github_url: '', linkedin_url: '', skills_summary: '' };

const StudentsAdmin = () => {
    const [students, setStudents] = useState([]);
    const [form, setForm] = useState(EmptyForm);
    const [error, setError] = useState('');
    const [editingId, setEditingId] = useState(null);

    const load = async () => {
        const res = await Admin.listStudents();
        setStudents(res.data || []);
    };

    useEffect(() => { load(); }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const creating = !editingId && !form.user_id;
        if (creating) {
            if (!form.name || !form.email || !form.username || !form.password) {
                setError('Name, email, username and password are required when creating a user');
                return;
            }
        }

        if (editingId) {
            await Admin.updateStudent(editingId, form);
        } else {
            await Admin.createStudent(form);
        }
        setForm(EmptyForm);
        setEditingId(null);
        load();
    };

    const handleEdit = (s) => {
        setEditingId(s.id);
        setForm({
            name: '',
            email: '',
            username: '',
            password: '',
            college_name: s.college_name || '',
            department: s.department || '',
            graduation_year: s.graduation_year || '',
            cgpa: s.cgpa || '',
            github_url: s.github_url || '',
            linkedin_url: s.linkedin_url || '',
            skills_summary: s.skills_summary || '',
        });
    };

    const handleDelete = async (id) => { if (confirm('Delete student?')) { await Admin.deleteStudent(id); load(); } };

    return (
        <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-bold mb-4">Manage Students</h2>
            <form onSubmit={handleSubmit} className="mb-4 grid grid-cols-2 gap-2">
                {error && <div className="col-span-2 text-red-600">{error}</div>}
                <input name="user_id" placeholder="User ID (leave blank to create)" value={form.user_id} onChange={handleChange} className="border p-2" />
                <input name="name" placeholder="Full name" value={form.name || ''} onChange={handleChange} className="border p-2" required={!form.user_id} />
                <input name="email" placeholder="Email" value={form.email || ''} onChange={handleChange} className="border p-2" type="email" required={!form.user_id} />
                <input name="username" placeholder="Username" value={form.username || ''} onChange={handleChange} className="border p-2" required={!form.user_id} />
                <input name="password" placeholder="Password" value={form.password || ''} onChange={handleChange} className="border p-2" type="password" required={!form.user_id} />
                <input name="college_name" placeholder="College" value={form.college_name} onChange={handleChange} className="border p-2" />
                <input name="department" placeholder="Department" value={form.department} onChange={handleChange} className="border p-2" />
                <input name="graduation_year" placeholder="Grad Year" value={form.graduation_year} onChange={handleChange} className="border p-2" />
                <input name="cgpa" placeholder="CGPA" value={form.cgpa} onChange={handleChange} className="border p-2" />
                <input name="github_url" placeholder="GitHub URL" value={form.github_url} onChange={handleChange} className="border p-2" />
                <input name="linkedin_url" placeholder="LinkedIn URL" value={form.linkedin_url} onChange={handleChange} className="border p-2" />
                <input name="skills_summary" placeholder="Skills" value={form.skills_summary} onChange={handleChange} className="border p-2" />
                <div className="col-span-2 flex gap-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">{editingId ? 'Update' : 'Create'}</button>
                    <button type="button" onClick={() => { setForm(EmptyForm); setEditingId(null); }} className="px-4 py-2 border rounded">Reset</button>
                </div>
            </form>

            <table className="w-full table-auto">
                <thead>
                    <tr className="text-left"><th className="p-2">ID</th><th className="p-2">User</th><th className="p-2">College</th><th className="p-2">Actions</th></tr>
                </thead>
                <tbody>
                    {students.map(s => (
                        <tr key={s.id} className="border-t">
                            <td className="p-2">{s.id}</td>
                            <td className="p-2">{s.user_id}</td>
                            <td className="p-2">{s.college_name}</td>
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

export default StudentsAdmin;
