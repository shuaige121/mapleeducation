'use client';

import { useMemo, useState } from 'react';
import { UserProfile, getRecommendedPaths } from '@/data/educationPaths';
import { motion } from 'framer-motion';
import { schools } from '@/data/mapData';
import { useI18n } from '@/lib/i18n/context';
import { ImagePlaceholder } from '@/components/ui/image-placeholder';

const DEFAULT_PROFILE: UserProfile = {
    age: 18,
    highestQualification: 'High School',
    grades: 'Good',
};

export default function SchoolPathfinder() {
    const { t, locale } = useI18n();
    const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);

    const results = useMemo(() => getRecommendedPaths(profile), [profile]);

    const reset = () => {
        setProfile(DEFAULT_PROFILE);
    };

    return (
        <div className="w-full max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
            <div className="p-8 md:p-12">
                <div className="text-center mb-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('pathfinder.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{t('pathfinder.subtitle')}</p>
                </div>

                <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label
                                htmlFor="age-input"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('pathfinder.form.age')}
                            </label>
                            <input
                                id="age-input"
                                type="number"
                                value={profile.age}
                                onChange={(e) => {
                                    const nextAge = Number.parseInt(e.target.value, 10);
                                    setProfile({
                                        ...profile,
                                        age: Number.isFinite(nextAge) ? nextAge : 0,
                                    });
                                }}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="qualification-select"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('pathfinder.form.qualification')}
                            </label>
                            <select
                                id="qualification-select"
                                value={profile.highestQualification}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        highestQualification: e.target.value as UserProfile['highestQualification'],
                                    })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="High School">{t('pathfinder.qual.highSchool')}</option>
                                <option value="O-Level">{t('pathfinder.qual.oLevel')}</option>
                                <option value="A-Level">{t('pathfinder.qual.aLevel')}</option>
                                <option value="Diploma">{t('pathfinder.qual.diploma')}</option>
                                <option value="Degree">{t('pathfinder.qual.degree')}</option>
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="grades-select"
                                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                            >
                                {t('pathfinder.form.grades')}
                            </label>
                            <select
                                id="grades-select"
                                value={profile.grades}
                                onChange={(e) =>
                                    setProfile({
                                        ...profile,
                                        grades: e.target.value as UserProfile['grades'],
                                    })
                                }
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option value="Excellent">{t('pathfinder.grade.excellent')}</option>
                                <option value="Good">{t('pathfinder.grade.good')}</option>
                                <option value="Average">{t('pathfinder.grade.average')}</option>
                                <option value="Pass">{t('pathfinder.grade.pass')}</option>
                            </select>
                        </div>

                        <div className="flex items-center justify-between gap-3 pt-2">
                            <button
                                onClick={reset}
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                {t('pathfinder.button.startOver')}
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <motion.div
                        key={`${profile.age}-${profile.highestQualification}-${profile.grades}-${locale}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        {results.map((path) => (
                            <div
                                key={path.id}
                                className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700"
                            >
                                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {path.name[locale]}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400 mb-6">
                                    {path.description[locale]}
                                </p>

                                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 transform -translate-y-1/2"></div>

                                    {path.steps.map((step, index) => (
                                        <div
                                            key={index}
                                            className="flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto z-0"
                                        >
                                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shrink-0">
                                                {index + 1}
                                            </div>
                                            <div className="md:text-center">
                                                <div className="font-bold text-gray-900 dark:text-white">
                                                    {step.title[locale]}
                                                </div>
                                                <div className="text-xs text-blue-600 font-semibold">
                                                    {step.duration[locale]}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400 hidden md:block max-w-[120px]">
                                                    {step.description[locale]}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <h5 className="text-sm font-semibold uppercase text-gray-500 mb-3">
                                        {t('pathfinder.availableAt')}
                                    </h5>
                                    {path.eligibleSchools.length ? (
                                        <div className="flex flex-wrap gap-3">
                                            {path.eligibleSchools.map((schoolId) => {
                                                const school = schools.find((s) => s.id === schoolId);
                                                if (!school) return null;
                                                return (
                                                    <div
                                                        key={schoolId}
                                                        className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                                                    >
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                                            <ImagePlaceholder className="h-6 w-6" label="LOGO" rounded />
                                                        </div>
                                                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {school.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {t('pathfinder.availableAtContact')}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
