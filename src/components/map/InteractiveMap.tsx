'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useI18n } from '@/lib/i18n/context';

function MapLoading() {
    const { t } = useI18n();

    return (
        <div className="w-full h-[600px] bg-gray-900 animate-pulse rounded-xl flex items-center justify-center text-gray-500">
            {t("map.loading")}
        </div>
    );
}

export default function InteractiveMap() {
    const Map = useMemo(() => dynamic(
        () => import('./SingaporeMap'),
        {
            loading: () => <MapLoading />,
            ssr: false
        }
    ), []);

    return <Map />;
}
