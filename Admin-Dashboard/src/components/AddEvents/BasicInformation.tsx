import { RootState } from '@/redux/store';
import { PersonStanding, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import InputComponent from '../InputComponent';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useAppDispatch } from '@/redux/hooks/hooks';
import { updateBasicInfo } from '@/redux/slices/addEventSlice';

const BasicInformation = () => {
    const { basicInfo } = useSelector((state: RootState) => state.addEvent);
    const dispatch = useAppDispatch();

    const [formData, setFormData] = useState({
        title: basicInfo.title,
        description: basicInfo.description,
        category: basicInfo.category,
        tags: basicInfo.tags,
        status: basicInfo.status
    });

    const [tagInput, setTagInput] = useState('');

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleTagInput = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === ' ' || e.key === 'Enter') && tagInput.trim()) {
            e.preventDefault();
            // Check if tag already exists or if we've reached the maximum of 4 tags
            if (!formData.tags.includes(tagInput.trim()) && formData.tags.length < 4) {
                setFormData(prev => ({
                    ...prev,
                    tags: [...prev.tags, tagInput.trim()]
                }));
            }
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleSaveBasicInfo = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(updateBasicInfo(formData));
        console.log('Updating basic info with...', formData);
        console.log('Current state of basic Info...', basicInfo);
    };

    return (
        <>
            <div className="flex flex-col mb-4">
                <form className="border border-slate-300 p-4" onSubmit={handleSaveBasicInfo}>
                    <h1 className="text-3xl font-semibold text-black/50">
                        Basic Information
                    </h1>
                    <div className="flex flex-col">
                        <label htmlFor="title" className="gray-header mb-0">
                            Title
                        </label>
                        <InputComponent
                            type="text"
                            name="title"
                            id="title"
                            placeholder="Enter Event Title"
                            classwidth=""
                            Icon={PersonStanding}
                            value={formData.title}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="description" className="gray-header mb-0">
                            Description
                        </label>
                        <textarea
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Add a small description (200 words)"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                        />

                        <div className="flex justify-between gap-5 mt-5">
                            <select 
                                className="h-10 w-full border border-slate-300 rounded-md hover:cursor-pointer outline-none"
                                name="category"
                                value={formData.category}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Type of Event</option>
                                <option value="concert">Concert</option>
                                <option value="conference">Conference</option>
                                <option value="workshop">Workshop</option>
                                <option value="sports">Sports</option>
                                <option value="exhibition">Exhibition</option>
                                <option value="other">Other</option>
                            </select>

                            <select 
                                className="h-10 w-full border border-slate-300 rounded-md hover:cursor-pointer outline-none"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Event Status</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="postponed">Postponed</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex flex-wrap gap-3 mt-5">
                            {formData.tags.map((tag, index) => (
                                <div 
                                    key={index}
                                    className="bg-black/10 p-2 rounded-xl flex gap-2 items-center hover:bg-customBlue/50 transition-colors"
                                >
                                    <p>{tag}</p>
                                    <button
                                        type="button"
                                        onClick={() => removeTag(tag)}
                                        className="hover:text-red-500 transition-colors"
                                    >
                                        <X size={17} />
                                    </button>
                                </div>
                            ))}
                            <input
                                type="text"
                                className="border border-slate-300 rounded-lg p-1 outline-none w-full"
                                placeholder={`Add Tags (${4 - formData.tags.length} remaining)`}
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInput}
                                disabled={formData.tags.length >= 4}
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn-primary mt-4 w-[150px]">Save</button>
                </form>
            </div>
        </>
    );
};

export default BasicInformation;