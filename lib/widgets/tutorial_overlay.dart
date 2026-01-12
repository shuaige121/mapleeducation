import 'package:flutter/material.dart';

class TutorialOverlay extends StatelessWidget {
  const TutorialOverlay({
    super.key,
    required this.title,
    required this.description,
    required this.onNext,
    required this.onSkip,
    this.nextLabel = 'Next',
    this.skipLabel = 'Skip',
    this.isLast = false,
  });

  final String title;
  final String description;
  final VoidCallback onNext;
  final VoidCallback onSkip;
  final String nextLabel;
  final String skipLabel;
  final bool isLast;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    
    // Choose high contrast colors. 
    // If dark mode, use light surface. If light mode, use dark surface.
    // Or just strictly use Dark Gray background with White text for maximum "Overlay" feel.
    final backgroundColor = Colors.blueGrey.shade900;
    final textColor = Colors.white;
    final subTextColor = Colors.white70;

    return Container(
      constraints: const BoxConstraints(maxWidth: 400),
      padding: const EdgeInsets.all(24),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.5),
            blurRadius: 20,
            offset: const Offset(0, 10),
          ),
        ],
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Icon(Icons.tips_and_updates, color: Colors.amberAccent, size: 28),
              const SizedBox(width: 12),
              Expanded(
                child: Text(
                  title,
                  style: theme.textTheme.titleLarge?.copyWith(
                    color: textColor,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 12),
          Text(
            description,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: subTextColor,
              height: 1.5,
              fontSize: 16,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              TextButton(
                onPressed: onSkip,
                child: Text(
                  skipLabel,
                  style: const TextStyle(color: Colors.white54),
                ),
              ),
              ElevatedButton.icon(
                onPressed: onNext,
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.white,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
                ),
                icon: Icon(isLast ? Icons.check : Icons.arrow_forward, size: 18),
                label: Text(nextLabel),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
