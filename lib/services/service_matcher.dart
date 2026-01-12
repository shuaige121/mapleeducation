import '../models/service_item.dart';

class ServiceMatchInput {
  ServiceMatchInput({
    required this.target,
    required this.currency,
    required this.budgetAmount,
    required this.notes,
  });

  final String target;
  final String currency;
  final double budgetAmount;
  final String notes;
}

class MatchResult {
  MatchResult({
    required this.item,
    required this.score,
    required this.reasons,
  });

  final ServiceItem item;
  final double score;
  final List<String> reasons;
}

class ServiceMatcher {
  List<MatchResult> match({
    required ServiceMatchInput input,
    required List<ServiceItem> catalog,
  }) {
    // 1. Sales Count (Desc) - Primary sort factor now
    // 2. Created Date (Desc) - Secondary
    // 3. Alpha
    
    // We modify this to just return everything sorted by rules, 
    // maybe filtering only if budget wildly mismatch?
    // For now, let's keep it simple: Return all, sorted by sales.

    final results = <MatchResult>[];

    for (final item in catalog) {
      // Basic scoring for "fit" if we still want to show "Why it fits"
      // But user asked for simple sorting by Sales.
      // So we assign score based on sales mostly.
      var score = item.salesCount.toDouble();
      final reasons = <String>[];
      
      // Add 'new' bonus
      if (item.createdAt != null && DateTime.now().difference(item.createdAt!).inDays < 30) {
        score += 5; // boost for new items
        reasons.add('New Arrival');
      }

      results.add(MatchResult(item: item, score: score, reasons: reasons));
    }

    // Sort by Sales Count (Desc), then Date (Desc), then Title (Asc)
    results.sort((a, b) {
      // 1. Sales
      int salesCompare = b.item.salesCount.compareTo(a.item.salesCount);
      if (salesCompare != 0) return salesCompare;

      // 2. Date
      DateTime aDate = a.item.createdAt ?? DateTime(2000);
      DateTime bDate = b.item.createdAt ?? DateTime(2000);
      int dateCompare = bDate.compareTo(aDate);
      if (dateCompare != 0) return dateCompare;

      // 3. Title
      return a.item.titleEn.compareTo(b.item.titleEn);
    });

    return results;
  }
}
