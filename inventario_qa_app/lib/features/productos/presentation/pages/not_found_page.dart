import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../auth/presentation/auth_provider.dart';
import '../../../../core/theme/app_theme.dart';

class NotFoundPage extends StatelessWidget {
  const NotFoundPage({super.key, this.reason});

  final String? reason;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.background,
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              const Text('📦', style: TextStyle(fontSize: 72)),
              const SizedBox(height: 12),
              const Text(
                '404',
                style: TextStyle(
                  color: AppColors.textPrimary,
                  fontSize: 56,
                  fontWeight: FontWeight.bold,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                reason ?? 'Esta página no existe o fue movida.',
                textAlign: TextAlign.center,
                style: const TextStyle(
                  color: AppColors.textMuted,
                  fontSize: 15,
                ),
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                onPressed: () {
                  final auth = context.read<AuthProvider>();
                  if (!auth.isAuthenticated) {
                    context.go('/login');
                  } else if (auth.isAdmin) {
                    context.go('/dashboard');
                  } else {
                    context.go('/catalogo');
                  }
                },
                child: const Text('Volver al inicio'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
