class ServiceItem {
  const ServiceItem({
    required this.id,
    required this.titleEn,
    required this.titleZh,
    required this.descriptionEn,
    required this.descriptionZh,
    required this.price,
    required this.category,
    this.tags = const [],
    this.salesCount = 0,
    this.createdAt,
  });

  final String id;
  final String titleEn;
  final String titleZh;
  final String descriptionEn;
  final String descriptionZh;
  final int price;
  final String category;
  final List<String> tags;
  final int salesCount;
  final DateTime? createdAt;

  factory ServiceItem.fromMap(String id, Map<String, dynamic> map) {
    return ServiceItem(
      id: id,
      titleEn: map['titleEn'] ?? '',
      titleZh: map['titleZh'] ?? '',
      descriptionEn: map['descriptionEn'] ?? '',
      descriptionZh: map['descriptionZh'] ?? '',
      price: map['price']?.toInt() ?? 0,
      category: map['category'] ?? 'other',
      tags: List<String>.from(map['tags'] ?? []),
      salesCount: map['salesCount']?.toInt() ?? 0,
      createdAt: map['createdAt'] != null
          ? (map['createdAt'] as dynamic).toDate()
          : null,
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'titleEn': titleEn,
      'titleZh': titleZh,
      'descriptionEn': descriptionEn,
      'descriptionZh': descriptionZh,
      'price': price,
      'category': category,
      'tags': tags,
      'salesCount': salesCount,
      'createdAt': createdAt,
    };
  }
}
